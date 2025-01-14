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

export enum BrandingLanguage {
  EN = 'en',
  DA = 'da',
  NL = 'nl',
  FI = 'fi',
  FR = 'fr',
  DE = 'de',
  HU = 'hu',
  IT = 'it',
  NB = 'nb',
  PT = 'pt',
  RO = 'ro',
  RU = 'ru',
  ES = 'es',
  SV = 'sv',
  TR = 'tr',
}

export interface Branding {
  accentColor: string;
  brandColor: string;
  language: BrandingLanguage;
  logo: ImageParams | null;
  favicon: ImageParams | null;
  organization: {
    name: string;
    country?: string;
    legalAddress?: string;
  };
}

export default Branding;
