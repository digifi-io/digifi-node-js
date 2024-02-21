import { PortalPageElementType, TextElement } from './BasePortalPageElement';

export interface BodyTextElement extends TextElement {
  elementType: PortalPageElementType.BodyText;
}
