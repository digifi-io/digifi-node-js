import ApiClient, { ApiClientOptions, ContentType, HTTP_METHOD, IApiClient } from './ApiClient';

class AuthorizedApiClient extends ApiClient implements IApiClient {
  constructor(
    baseUrl: string,
    protected apiKey: string,
    options?: ApiClientOptions,
  ) {
    super(baseUrl, options);
  }

  protected getBasicHeaders(method: HTTP_METHOD, contentType?: ContentType) {
    const headers = super.getBasicHeaders(method, contentType);

    headers.set('api-key', this.apiKey);

    return headers;
  }
}

export default AuthorizedApiClient;
