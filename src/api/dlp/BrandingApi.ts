import { AuthorizedApiClient } from '../../AuthorizedApiClient';

interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IImageParams {
  id: string;
  originalFileName: string;
  cropRect: IRect;
  imageRect: IRect;
  canvasWidth: number;
  canvasHeight: number;
}

export interface Branding {
  accentColor: string;
  brandColor: string;
  logo: IImageParams | null;
  favicon: IImageParams | null;
  organizationId: string;
}

class BrandingApi {
  protected path = '/branding'

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public getBranding(): Promise<Branding> {
    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default BrandingApi;
