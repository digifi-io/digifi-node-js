import AuthorizedApiClient from './AuthorizedApiClient';
import { FetchOptions, HTTP_METHOD, RequestBody } from './ApiClient';

class AuthApiClient extends AuthorizedApiClient {
  constructor(
    baseUrl: string,
    apiKey: string,
    protected entity: 'borrowers' | 'intermediaries',
  ) {
    super(baseUrl, apiKey);
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
