import { Headers } from 'node-fetch';
import { IApiClient } from '../../clients';
import { Branding } from '../../data/models';

class BrandingApi {
  private fetchFilesHeaders = new Headers({
    responseType: 'arraybuffer',
    accept: '*/*'
  });

  protected path = '/branding'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getBranding(): Promise<Branding> {
    return this.apiClient.makeCall(`${this.path}`);
  }

  public async getLogo(logoId: string): Promise<ArrayBuffer> {
    const logo = await this.apiClient.makeCall<Response>(`${this.path}/logo/${logoId}`, 'GET', undefined, {
      headers: this.fetchFilesHeaders,
    });

    return await logo.arrayBuffer();
  }

  public async getFavicon(faviconId: string) {
    const favicon = await this.apiClient.makeCall<Response>(`${this.path}/favicon/${faviconId}`, 'GET', undefined, {
      headers: this.fetchFilesHeaders,
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

export default BrandingApi;
