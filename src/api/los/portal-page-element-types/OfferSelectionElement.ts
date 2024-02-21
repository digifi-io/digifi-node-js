import { BasePortalPageElement, PortalPageElementType } from './BasePortalPageElement';

export interface OfferSelectionElementConfig {
  variable: string;
  displayedColumns: string[];
  availableColumn: string;
  selectedColumn: string;
}

export interface OfferSelectionElement extends BasePortalPageElement {
  config: OfferSelectionElementConfig;
  elementType: PortalPageElementType.OfferSelection;
}
