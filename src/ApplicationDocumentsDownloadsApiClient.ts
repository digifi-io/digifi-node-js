import { ApiClientOptions, ContentType, HTTP_METHOD, IApiClient } from './ApiClient';
import { AuthorizedApiClient } from './AuthorizedApiClient';
import { Headers } from 'node-fetch';

export class ApplicationDocumentsDownloadsApiClient extends AuthorizedApiClient implements IApiClient {
  constructor(
    baseUrl: string,
    protected clientId: string,
    protected clientSecret: string,
    options?: ApiClientOptions,
  ) {
    super(baseUrl, clientId, clientSecret, options);
  }

  protected getBasicHeaders(method: HTTP_METHOD, contentType?: ContentType) {
    const headers = new Headers({
      responseType: 'arraybuffer',
      accept: '*/*'
    });

    headers.set('clientid', this.clientId);
    headers.set('clientsecret', this.clientSecret);

    return headers;
  }
}
