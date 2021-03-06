import { AuthorizedApiClient } from './AuthorizedApiClient';
import {FetchOptions, HTTP_METHOD, IApiClient, RequestBody} from './ApiClient';

const WITH_QUERY_PARAMS_METHODS: HTTP_METHOD[] = ['GET', 'DELETE'];
const WITH_BODY_PARAMS_METHODS: HTTP_METHOD[]= ['POST', 'PUT'];

export default class DecisionEngineApiClient extends AuthorizedApiClient implements IApiClient {
  constructor(
    baseUrl: string,
    apiKey: string,
  ) {
    super(baseUrl, apiKey);
  }
  public async makeCall<ResBody, ReqBody extends RequestBody = RequestBody>(
    url: string,
    method: HTTP_METHOD = 'GET',
    body?: ReqBody,
    options: Partial<FetchOptions> = {},
  ): Promise<ResBody> {
    const queryParams = this.getQueryParamsWithAuthenticationParams(method);
    const bodyWithAuthenticationParams = this.getBodyWithAuthenticationParams(method, body);
    const urlWithAuthenticationParams = url.includes('?') ? `${url}&${queryParams}` : `${url}?${queryParams};`

    return super.makeCall(urlWithAuthenticationParams, method, bodyWithAuthenticationParams, options);
  }

  private getQueryParamsWithAuthenticationParams(method: HTTP_METHOD) {
    const params = new URLSearchParams();

    if (!WITH_QUERY_PARAMS_METHODS.includes(method)) {
      return params;
    }

    params.set('clientsecret', this.apiKey);

    return params;
  }

  private getBodyWithAuthenticationParams<ReqBody extends RequestBody = RequestBody>(method: HTTP_METHOD, body?: ReqBody) {
    if (!WITH_BODY_PARAMS_METHODS.includes(method) || !body || typeof body !== 'object') {
      return body;
    }

    return {
      ...body as Record<string, unknown>,
      client_secret: this.apiKey,
    };
  }
}
