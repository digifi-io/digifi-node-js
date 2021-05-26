import fetch, { Response, Headers } from 'node-fetch';
import FormData from 'form-data';
import ApiRequestError from './errors/ApiRequestError';

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestBody = string | Record<string, unknown> | FormData;
export type ContentType = 'application/json' | 'text/html' | null;

interface FetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export interface FetchOptions {
  headers: Headers;
  contentType: ContentType;
  statusChecker: () => void;
}

export default class ApiClient {
  protected defaultContentType: ContentType = 'application/json';

  constructor(
    private baseUrl: string,
    private clientId: string,
    private clientSecret: string,
  ) {
    this.checkStatus = this.checkStatus.bind(this);
  }

  public async makeCall<ResBody, ReqBody = RequestBody>(
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
      `${this.baseUrl}/${url}`,
      { method, headers },
    );

    await this.checkStatus(response);

    return response.json();
  }

  protected async checkStatus(response: FetchResponse): Promise<FetchResponse> {
    if (response.ok) {
      return response;
    }

    const body = await response.json();
    const errorMessage = body.message || body.data?.error || body.error?.message || response.statusText;

    throw new ApiRequestError(errorMessage, response.status);
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
}