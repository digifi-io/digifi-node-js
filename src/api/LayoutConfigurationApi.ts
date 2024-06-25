import { IApiClient } from '../clients';
import getSearchParams from '../utils/getSearchParams';
import { BaseCard, BaseGroup, BaseVariableConfiguration } from '../types';
import { SearchParams } from './base';

export enum LayoutConfigurationReferenceType {
  BorrowerProfile = 'borrowerProfile',
  IntermediaryProfile = 'intermediaryProfile',
  DataTab = 'dataTab',
  ApplicationForm = 'applicationForm',
}

export interface FindLayoutConfigurationParams {
  referenceType: LayoutConfigurationReferenceType;
  reference?: string;
}

export interface BaseLayout<
  GroupType extends BaseGroup = BaseGroup,
  CardType extends BaseCard = BaseCard,
  VariableType extends BaseVariableConfiguration = BaseVariableConfiguration
> {
  groups: GroupType[];
  cards: CardType[];
  variables: VariableType[];
}

export interface LayoutConfigurationApi<
  GroupType extends BaseGroup = BaseGroup,
  CardType extends BaseCard = BaseCard,
  VariableType extends BaseVariableConfiguration = BaseVariableConfiguration
> {
  find(params: FindLayoutConfigurationParams): Promise<BaseLayout<GroupType, CardType, VariableType>>
}

export class LayoutConfigurationRestApi<
  GroupType extends BaseGroup = BaseGroup,
  CardType extends BaseCard = BaseCard,
  VariableType extends BaseVariableConfiguration = BaseVariableConfiguration
> implements LayoutConfigurationApi {
  protected path = '/layout-configuration';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(params: FindLayoutConfigurationParams): Promise<BaseLayout<GroupType, CardType, VariableType>> {
    const searchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall(`${this.path}?${searchParams}`);
  }
}

