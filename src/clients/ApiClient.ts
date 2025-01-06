import fetch, { Response, Headers } from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import retry from 'retry';
import FormData from 'form-data';
import { ApiRequestError, NetworkError } from '../errors';
import { ResponseHeader } from '../enums/ResponseHeader';

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestBody = string | { [key: string]: any } | FormData;
export type ContentType = 'application/json' | 'text/html' | null;

export type CompatibleApiVersion = '2024-02-26';

interface FetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export interface FetchOptions {
  headers: Headers;
  contentType: ContentType;
  idempotencyKey?: string;
}

export interface RequestMetadata {
  url: string;
  method: string;
  duration: number;
  statusCode: number;
  requestId: string | null;
}

export interface ApiClientLogger {
  info: (requestMetadata: RequestMetadata) => void;
  error: (error: ApiRequestError, requestMetadata: RequestMetadata) => void;
}

export interface ApiClientOptions {
  apiVersion: CompatibleApiVersion;
  enableIdempotencyHeader?: boolean;
  maxNetworkRetries?: number;
  logger?: ApiClientLogger;
}

interface MakeFetchOptions {
  method: string;
  headers: Headers;
  body: string | FormData | undefined;
}

export interface IApiClient {
  makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    path: string,
    method?: HTTP_METHOD,
    body?: ReqBody,
    options?: Partial<FetchOptions>,
  ): Promise<ResBody>;
}

class ApiClient implements IApiClient {
  protected defaultContentType: ContentType = 'application/json';
  protected idempotencyKeyHeader = 'idempotency-key';
  protected digifiShouldRetryHeader = 'digifi-should-retry';
  protected defaultMaxNetworkRetries = 0;
  protected defaultRetryFactor = 2;
  protected defaultRetryMinTimeout = 1000;

  constructor(
    private baseUrl: string,
    protected options: ApiClientOptions,
  ) {
    this.checkStatus = this.checkStatus.bind(this);
  }

  public async makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    path: string,
    method: HTTP_METHOD = 'GET',
    body?: ReqBody,
    options: Partial<FetchOptions> = {},
  ): Promise<ResBody> {
    const { headers: customHeaders, contentType = this.defaultContentType, idempotencyKey } = options;

    const headers = this.getBasicHeaders(method, contentType, idempotencyKey);

    customHeaders?.forEach((value: string, header: string) => {
      headers.set(header, value);
    });

    return this.makeFetchWithRetries(
      `${this.baseUrl}${path}`,
      { method, headers, body: this.stringifyBody(body) },
    );
  }

  protected makeFetchWithRetries<ResBody>(url: string, options: MakeFetchOptions): Promise<ResBody> {
    const operation = retry.operation({
      retries: this.options?.maxNetworkRetries || this.defaultMaxNetworkRetries,
      factor: this.defaultRetryFactor,
      minTimeout: this.defaultRetryMinTimeout,
      randomize: true,
    });

    return new Promise<ResBody>((resolve, reject) => {
      operation.attempt(() => {
        this.makeFetch(url, options)
          .then(resolve as (value: unknown) => void)
          .catch((err) => {
            const shouldRetry = this.shouldRetry(err);

            if (!shouldRetry) {
              operation.stop();

              return reject(err);
            }

            if (operation.retry(err)) {
              return;
            }

            reject(err);
          });
      });
    });
  }

  protected async makeFetch(url: string, options: MakeFetchOptions) {
    const startedAt = Date.now();

    try {
      const response = await fetch(url, options);

      await this.checkStatus(response as FetchResponse);

      this.options?.logger?.info({
        url: url.toString(),
        method: options?.method || 'GET',
        duration: Date.now() - startedAt,
        statusCode: response.status,
        requestId: response.headers.get(ResponseHeader.RequestId),
      });

      if (options.headers.get('responseType') === 'arraybuffer') {
        return response;
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiRequestError) {
        this.options?.logger?.error(error, {
          duration: Date.now() - startedAt,
          url: url.toString(),
          method: options?.method || 'GET',
          statusCode: error.responseStatus,
          requestId: error.requestId,
        });

        throw error;
      }

      throw new NetworkError((error as NetworkError).message);
    }
  }

  protected async checkStatus(response: FetchResponse) {
    if (response.ok) {
      return;
    }

    const body = await this.getErrorResponseBody(response);
    const data = body.error || body.data || body;
    const { code: errorCode, message, ...errorData } = data || {};
    const errorMessage = message || body.data?.error || response.statusText;

    throw new ApiRequestError(errorMessage, response.status, response.headers, errorCode, errorData);
  }

  protected getBasicHeaders(
    method: HTTP_METHOD,
    contentType?: ContentType,
    idempotencyKey?: string,
  ) {
    const headers = new Headers();

    headers.set('api-version', this.options.apiVersion);

    if (contentType) {
      headers.set('Accept', contentType);
      headers.set('Content-Type', contentType);
    }

    const shouldUseIdempotencyHeader = !!(this.options?.enableIdempotencyHeader && this.options?.maxNetworkRetries)
      || !!idempotencyKey;

    if (method === 'POST' && shouldUseIdempotencyHeader) {
      headers.set(this.idempotencyKeyHeader, idempotencyKey || this.generateIdempotencyKey());
    }

    return headers;
  }

  protected stringifyBody(body?: RequestBody) {
    if (typeof body === 'string' || body instanceof FormData || typeof body === 'undefined') {
      return body;
    }

    return JSON.stringify(body);
  }

  protected generateIdempotencyKey() {
    return uuidv4();
  }

  private async getErrorResponseBody(response: FetchResponse) {
    try {
      return await response.json();
    } catch (err) {
      throw new ApiRequestError(response.statusText, response.status, response.headers);
    }
  }

  private shouldRetry(error: Error) {
    if (error instanceof NetworkError) {
      return true;
    }

    if (!(error instanceof ApiRequestError)) {
      return false;
    }

    const digifiShouldRetryHeaderValue = error.responseHeaders?.get(this.digifiShouldRetryHeader);

    return digifiShouldRetryHeaderValue === 'true'
      || error.responseStatus === 409
      || error.responseStatus >= 500;
  }
}

export default ApiClient;
