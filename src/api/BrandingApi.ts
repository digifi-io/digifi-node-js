import { Headers } from 'node-fetch';
import { IApiClient } from '../clients';
import { Branding } from '../data/models';

export interface BrandingApi {
  getBranding(): Promise<Branding>;
  getLogo(logoId: string): Promise<ArrayBuffer>;
  getFavicon(faviconId: string): Promise<ArrayBuffer>;
  getLogoProxyUrl(): string;
  getFaviconProxyUrl(): string;
}

export class BrandingRestApi implements BrandingApi {
  private fetchFilesHeaders = new Headers({
    responseType: 'arraybuffer',
    accept: '*/*'
  });

  protected path = '/branding'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getBranding(): Promise<Branding> {
    return this.apiClient.makeCall(this.path);
  }

  public async getLogo(logoId: string): Promise<ArrayBuffer> {
    const logo = await this.apiClient.makeCall<Response>(`${this.path}/logo/${logoId}`, 'GET', undefined, {
      headers: this.fetchFilesHeaders,
    });

    return await logo.arrayBuffer();
  }

  public async getFavicon(faviconId: string): Promise<ArrayBuffer> {
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
