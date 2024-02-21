import { ElementAlignment, BasePortalPageElement, PortalPageElementType } from './BasePortalPageElement';

export interface ButtonElementConfig {
  text: string;
  alignment: ElementAlignment;
  automationWorkflowId: string;
}

export interface ButtonElement extends BasePortalPageElement {
  config: ButtonElementConfig;
  elementType: PortalPageElementType.Button;
}
