import { ApiClient } from '../../ApiClient';
import { Headers } from 'node-fetch';

const DEFAULT_HEADERS = new Headers({
  responseType: 'arraybuffer',
  accept: '*/*'
});

class UnauthorizedBrandingApi {
  protected path = '/branding'

  constructor(
    private apiClient: ApiClient,
  ) {}
  
  public async getLogo(logoId: string): Promise<ArrayBuffer> {
    const logo = await this.apiClient.makeCall<Response>(`${this.path}/logo/${logoId}`, 'GET', undefined, {
      headers: DEFAULT_HEADERS,
    });

    return await logo.arrayBuffer();
  }

  public async getFavicon(faviconId: string) {
    const favicon = await this.apiClient.makeCall<Response>(`${this.path}/favicon/${faviconId}`, 'GET', undefined, {
      headers: DEFAULT_HEADERS,
    })

    return await favicon.arrayBuffer();
  }

  public getLogoProxyUrl(): string {
    return `${this.path}/logo`;
  }

  public getFaviconProxyUrl(): string {
    return `${this.path}/favicon`;
  }
}

export default UnauthorizedBrandingApi;
