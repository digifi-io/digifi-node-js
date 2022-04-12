import { AuthorizedApiClient } from './AuthorizedApiClient';
import { FetchOptions, HTTP_METHOD, RequestBody } from './ApiClient';

class AuthApiClient extends AuthorizedApiClient {
  protected entity;

  constructor(
    baseUrl: string,
    clientId: string,
    clientSecret: string,
    entity: 'borrowers' | 'intermediaries',
  ) {
    super(baseUrl, clientId, clientSecret);
    this.entity = entity;
  }

  public async makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    url: string,
    method: HTTP_METHOD = 'GET',
    body?: ReqBody,
    options: Partial<FetchOptions> = {},
  ): Promise<ResBody> {
    return super.makeCall(`/${this.entity}${url}`, method, body, options);
  }
}

export default AuthApiClient;
