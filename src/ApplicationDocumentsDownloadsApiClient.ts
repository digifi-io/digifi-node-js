import { ApiClientOptions, ContentType, HTTP_METHOD, IApiClient } from './ApiClient';
import { AuthorizedApiClient } from './AuthorizedApiClient';
import { Headers } from 'node-fetch';

export class ApplicationDocumentsDownloadsApiClient extends AuthorizedApiClient implements IApiClient {
  constructor(
    baseUrl: string,
    protected apiKey: string,
    options?: ApiClientOptions,
  ) {
    super(baseUrl, apiKey, options);
  }

  protected getBasicHeaders(method: HTTP_METHOD, contentType?: ContentType) {
    const headers = new Headers({
      responseType: 'arraybuffer',
      accept: '*/*'
    });

    headers.set('api-key', this.apiKey);

    return headers;
  }
}
