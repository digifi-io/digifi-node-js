import { ApiClient, ApiClientOptions, ContentType, HTTP_METHOD, IApiClient } from './ApiClient';

export class AuthorizedApiClient extends ApiClient implements IApiClient {
  constructor(
    baseUrl: string,
    protected clientId: string,
    protected clientSecret: string,
    options?: ApiClientOptions,
  ) {
    super(baseUrl, options);
  }

  protected getBasicHeaders(method: HTTP_METHOD, contentType?: ContentType) {
    const headers = super.getBasicHeaders(method, contentType);

    headers.set('clientid', this.clientId);
    headers.set('clientsecret', this.clientSecret);

    return headers;
  }
}
