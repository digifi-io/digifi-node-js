import { IApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { SearchParams } from '../BaseSystemApi';
import { ButtonElement } from './portal-page-element-types/ButtonElement';
import { TasksElement } from './portal-page-element-types/TasksElement';
import { HeaderTextElement } from './portal-page-element-types/HeaderTextElement';
import { SubHeaderTextElement } from './portal-page-element-types/SubHeaderTextElement';
import { BodyTextElement } from './portal-page-element-types/BodyTextElement';
import { PageDividerElement } from './portal-page-element-types/PageDividerElement';
import { OfferSelectionElementConfig } from './portal-page-element-types/OfferSelectionElement';
import { ImageElement } from './portal-page-element-types/ImageElement';

export type PortalPageElement =
  | HeaderTextElement
  | SubHeaderTextElement
  | BodyTextElement
  | PageDividerElement
  | TasksElement
  | OfferSelectionElementConfig
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
