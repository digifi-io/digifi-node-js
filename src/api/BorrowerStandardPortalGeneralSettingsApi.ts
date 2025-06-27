import { IApiClient } from '../clients';
import DigitalLendingPortalEnvironment from '../enums/DigitalLendingPortalEnvironment';
import getSearchParams from '../utils/getSearchParams';
import { IBaseStandardPortalConfig  } from './StandardPortalGeneralSettingsApi';

export interface StandardBorrowerPortalConfig extends IBaseStandardPortalConfig {
  borrowerLockPeriodDays: number;
}

export interface BorrowerStandardPortalGeneralSettings {
  config: StandardBorrowerPortalConfig;
  accessPasswordExists: boolean;
}

export interface BorrowerStandardPortalGeneralSettings {
  borrowerLockPeriodDays: number;
}

export interface GetGeneralSettingsParams {
  environment: DigitalLendingPortalEnvironment;
}

export interface BorrowerStandardPortalGeneralSettingsApi {
  getGeneralSettings(params?: GetGeneralSettingsParams): Promise<BorrowerStandardPortalGeneralSettings>;
}

/**
 * @deprecated Use StandardPortalGeneralSettingsRestApi instead
 */
export class BorrowerStandardPortalGeneralSettingsRestApi implements BorrowerStandardPortalGeneralSettingsApi {
  protected path = '/borrowers/standard-portals/general-settings';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getGeneralSettings(params?: GetGeneralSettingsParams): Promise<BorrowerStandardPortalGeneralSettings> {
    const urlSearchParams = getSearchParams({
      environment: params?.environment || DigitalLendingPortalEnvironment.Production,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}
