import fetch, { Response, Headers } from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import retry from 'retry';
import FormData from 'form-data';
import ApiRequestError from './errors/ApiRequestError';
import NetworkError from './errors/NetworkError';

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestBody = string | { [key: string]: any } | FormData;
export type ContentType = 'application/json' | 'text/html' | null;

interface FetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export interface FetchOptions {
  headers: Headers;
  contentType: ContentType;
  idempotencyKey?: string;
}

export interface ApiClientOptions {
  enableIdempotencyHeader?: boolean;
  maxNetworkRetries?: number;
}

export interface IApiClient {
  makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    url: string,
    method?: HTTP_METHOD,
    body?: ReqBody,
    options?: Partial<FetchOptions>,
  ): Promise<ResBody>;
}

export class ApiClient implements IApiClient {
  protected defaultContentType: ContentType = 'application/json';
  protected idempotencyKeyHeader = 'idempotency-key';
  protected digifiShouldRetryHeader = 'digifi-should-retry';
  protected defaultMaxNetworkRetries = 0;
  protected defaultRetryFactor = 2;
  protected defaultRetryMinTimeout = 1000;

  constructor(
    private baseUrl: string,
    protected options?: ApiClientOptions,
  ) {
    this.checkStatus = this.checkStatus.bind(this);
  }

  public async makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    url: string,
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
      `${this.baseUrl}${url}`,
      { method, headers, body: this.stringifyBody(body) },
    );
  }

  protected makeFetchWithRetries<ResBody>(...args: Parameters<typeof fetch>) {
    const operation = retry.operation({
      retries: this.options?.maxNetworkRetries || this.defaultMaxNetworkRetries,
      factor: this.defaultRetryFactor,
      minTimeout: this.defaultRetryMinTimeout,
      randomize: true,
    });

    return new Promise<ResBody>((resolve, reject) => {
      operation.attempt(() => {
        this.makeFetch(...args)
          .then(resolve)
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

  protected async makeFetch(...args: Parameters<typeof fetch>) {
    try {
      const [, options] = args;
      const response = await fetch(...args);

      await this.checkStatus(response);

     if((options?.headers as Headers).get('responseType') === 'arraybuffer') {
       return response.arrayBuffer();
     }

      return response.json();
    } catch (err) {
      if (err instanceof ApiRequestError) {
        throw err;
      }

      throw new NetworkError(err.message);
    }
  }

  protected async checkStatus(response: FetchResponse) {
    if (response.ok) {
      return;
    }

    const body = await this.getErrorResponseBody(response);
    const errorMessage = body.message || body.data?.error || body.error?.message || response.statusText;

    throw new ApiRequestError(errorMessage, response.status, response.headers);
  }

  protected getBasicHeaders(
    method: HTTP_METHOD,
    contentType?: ContentType,
    idempotencyKey?: string,
  ) {
    const headers = new Headers();

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
