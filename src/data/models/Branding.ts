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
  organization: {
    name: string;
    country?: string;
    legalAddress?: string;
  };
}

export default Branding;
