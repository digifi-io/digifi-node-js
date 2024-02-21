import { ImageParams } from '../../../data/models';
import { BasePortalPageElement, PortalPageElementType } from './BasePortalPageElement';

export enum ImageElementAlignment {
  Fill = 'fill',
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export interface ImageElementConfig {
  alignment: ImageElementAlignment;
  image: ImageParams | null;
}

export interface ImageElement extends BasePortalPageElement {
  config: ImageElementConfig;
  elementType: PortalPageElementType.Image;
}
