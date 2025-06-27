import { IApiClient } from '../clients';
import DigitalLendingPortalEnvironment from '../enums/DigitalLendingPortalEnvironment';
import PortalUserType from '../enums/PortalUserType';
import getSearchParams from '../utils/getSearchParams';
import { BorrowerStandardPortalGeneralSettings } from './BorrowerStandardPortalGeneralSettingsApi';

export enum StandardPortalStatusDisplayType {
  Summary = 'summary',
  Actual = 'actual',
}

export interface IBaseStandardPortalConfig {
  statusDisplayType: StandardPortalStatusDisplayType;
}

export interface IntermediaryStandardPortalGeneralSettings {
  config: IBaseStandardPortalConfig;
  accessPasswordExists: boolean;
}

export type StandardPortalGeneralSettings =
  | BorrowerStandardPortalGeneralSettings
  | IntermediaryStandardPortalGeneralSettings;

export interface GetStandardPortalGeneralSettingsParams {
  environment: DigitalLendingPortalEnvironment;
  portalUserType: PortalUserType;
}

export interface StandardPortalGeneralSettingsApi {
  getGeneralSettings(params: GetStandardPortalGeneralSettingsParams): Promise<StandardPortalGeneralSettings>;
}

export class StandardPortalGeneralSettingsRestApi implements StandardPortalGeneralSettingsApi {
  protected path = '/standard-portals/general-settings';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getGeneralSettings(params: GetStandardPortalGeneralSettingsParams): Promise<StandardPortalGeneralSettings> {
    const urlSearchParams = getSearchParams({
      environment: params.environment,
      portalUserType: params.portalUserType,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}
