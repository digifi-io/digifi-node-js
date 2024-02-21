export enum PortalPageElementType {
  HeaderText = 'HeaderText',
  SubHeaderText = 'SubHeaderText',
  BodyText = 'BodyText',
  OfferSelection = 'OfferSelection',
  Tasks = 'Tasks',
  DataInput = 'DataInput',
  Button = 'Button',
  Image = 'Image',
  PageDivider = 'PageDivider',
}

export enum ElementAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export interface TextElementConfig {
  text: string;
  alignment: ElementAlignment;
}

export interface TextElement extends BasePortalPageElement {
  config: TextElementConfig;
}

export interface BasePortalPageElement {
  id: string;
  productId: string;
  portalPageId: string;
  organizationId: string;
  organizationVersion: number;
  elementType: PortalPageElementType;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}
