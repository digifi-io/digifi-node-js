import { IApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { SearchParams } from '../BaseSystemApi';
import { ImageParams } from '../../data/models';

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

export enum ImageElementAlignment {
  Fill = 'fill',
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum PageDividerElementLength {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

interface BasePortalPageElement {
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

export interface TextElementConfig {
  text: string;
  alignment: ElementAlignment;
}

export interface PageDividerElementConfig {
  length: PageDividerElementLength;
  alignment: ElementAlignment;
}

export type TasksElementConfig = Record<string, never>;

export interface OfferSelectionElementConfig {
  variable: string;
  displayedColumns: string[];
  availableColumn: string;
  selectedColumn: string;
}

export interface ImageElementConfig {
  alignment: ImageElementAlignment;
  image: ImageParams | null;
}

export interface ButtonElementConfig {
  text: string;
  alignment: ElementAlignment;
  automationWorkflowId: string;
}

export interface TextElement extends BasePortalPageElement {
  config: TextElementConfig;
}

export interface HeaderTextElement extends TextElement {
  elementType: PortalPageElementType.HeaderText;
}

export interface SubHeaderTextElement extends TextElement {
  elementType: PortalPageElementType.SubHeaderText;
}

export interface BodyTextElement extends TextElement {
  elementType: PortalPageElementType.BodyText;
}

export interface PageDividerElement extends BasePortalPageElement {
  config: PageDividerElementConfig;
  elementType: PortalPageElementType.PageDivider;
}

export interface TasksElement extends BasePortalPageElement {
  elementType: PortalPageElementType.Tasks;
  config: TasksElementConfig;
}

export interface OfferSelectionElement extends BasePortalPageElement {
  config: OfferSelectionElementConfig;
  elementType: PortalPageElementType.OfferSelection;
}

export interface ImageElement extends BasePortalPageElement {
  config: ImageElementConfig;
  elementType: PortalPageElementType.Image;
}

export interface ButtonElement extends BasePortalPageElement {
  config: ButtonElementConfig;
  elementType: PortalPageElementType.Button;
}

export type PortalPageElement =
  | HeaderTextElement
  | SubHeaderTextElement
  | BodyTextElement
  | PageDividerElement
  | TasksElement
  | OfferSelectionElement
  | ImageElement
  | ButtonElement;

export interface FindPortalPageElements {
  statusId?: string;
}

export interface PortalPageElementsApi {
  find(params: FindPortalPageElements): Promise<PortalPageElement[]>;
}

export default class PortalPageElementsApiService implements PortalPageElementsApi{
  protected path = 'portal-page-elements';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public async find(params: FindPortalPageElements): Promise<PortalPageElement[]> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    return await this.apiClient.makeCall<PortalPageElement[]>(`/${this.path}?${urlSearchParams}`);
  }
}
