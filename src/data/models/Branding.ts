export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageParams {
  id: string;
  originalFileName: string;
  cropRect: Rect;
  imageRect: Rect;
  canvasWidth: number;
  canvasHeight: number;
}

export interface Branding {
  accentColor: string;
  brandColor: string;
  logo: ImageParams | null;
  favicon: ImageParams | null;
  environment: BrandingEnvironment | null;
  type: BrandingType;
  organization: {
    name: string;
    country?: string;
    legalAddress?: string;
  };
}

export enum BrandingEnvironment {
  Production = 'production',
  Testing = 'testing',
}

export enum BrandingType {
  Email = 'email',
  BorrowerPortal = 'borrowerPortal',
}

export default Branding;
