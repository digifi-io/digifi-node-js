import fetch, { Response, Headers } from 'node-fetch';
import FormData from 'form-data';
import ApiRequestError from './errors/ApiRequestError';

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestBody = string | { [key: string]: any } | FormData;
export type ContentType = 'application/json' | 'text/html' | null;

interface FetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export interface FetchOptions {
  headers: Headers;
  contentType: ContentType;
  statusChecker: () => void;
}

export class ApiClient {
  protected defaultContentType: ContentType = 'application/json';

  constructor(
    private baseUrl: string,
    protected clientId: string,
    protected clientSecret: string,
  ) {
    this.checkStatus = this.checkStatus.bind(this);
  }

  public async makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    url: string,
    method: HTTP_METHOD = 'GET',
    body?: ReqBody,
    options: Partial<FetchOptions> = {},
  ): Promise<ResBody> {
    const { headers: customHeaders, contentType = this.defaultContentType, statusChecker = this.checkStatus } = options;

    const headers = this.getBasicHeaders(contentType);

    customHeaders?.forEach((value: string, header: string) => {
      headers.set(header, value);
    });

    const response = await fetch(
      `${this.baseUrl}${url}`,
      { method, headers, body: this.stringifyBody(body) },
    );

    await statusChecker(response);

    return response.json();
  }

  protected async checkStatus(response: FetchResponse): Promise<FetchResponse> {
    try {
      if (response.ok) {
        return response;
      }

      const body = await response.json();
      const errorMessage = body.message || body.data?.error || body.error?.message || response.statusText;

      throw new ApiRequestError(errorMessage, response.status);
    } catch (err) {
      // TODO [Ilya] Rewrite that
      if (err instanceof ApiRequestError) {
        throw err;
      }

      throw new ApiRequestError(response.statusText, response.status);
    }
  }

  protected getBasicHeaders(contentType?: ContentType) {
    const headers = new Headers();

    headers.set('clientid', this.clientId);
    headers.set('clientsecret', this.clientSecret);

    if (contentType) {
      headers.set('Accept', contentType);
      headers.set('Content-Type', contentType);
    }

    return headers;
  }

  protected stringifyBody(body?: RequestBody) {
    if (typeof body === 'string' || body instanceof FormData || typeof body === 'undefined') {
      return body;
    }

    return JSON.stringify(body);
  }
}
