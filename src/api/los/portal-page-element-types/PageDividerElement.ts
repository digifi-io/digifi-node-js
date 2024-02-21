import { BasePortalPageElement, ElementAlignment, PortalPageElementType } from './BasePortalPageElement';

export enum PageDividerElementLength {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

export interface PageDividerElementConfig {
  length: PageDividerElementLength;
  alignment: ElementAlignment;
}

export interface PageDividerElement extends BasePortalPageElement {
  config: PageDividerElementConfig;
  elementType: PortalPageElementType.PageDivider;
}
