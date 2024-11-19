import { Headers } from 'node-fetch';
import { IApiClient } from '../clients';
import { Branding, BrandingEnvironment, BrandingType } from '../data/models';
import getSearchParams from '../utils/getSearchParams';
import { SearchParams } from './base';

export interface BrandingApi {
  getBranding(params: GetBrandingParams): Promise<Branding>;
  getLogo(logoId: string): Promise<ArrayBuffer>;
  getFavicon(faviconId: string): Promise<ArrayBuffer>;
  getLogoProxyUrl(): string;
  getFaviconProxyUrl(): string;
}

export interface GetBrandingParams {
  environment?: BrandingEnvironment;
  type?: BrandingType;
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

  public getBranding(params?: GetBrandingParams): Promise<Branding> {
    const queryParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall(`${this.path}?${queryParams}`);
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
