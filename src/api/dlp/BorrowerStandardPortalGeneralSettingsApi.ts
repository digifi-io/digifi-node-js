import { IApiClient } from '../../clients';
import { BorrowerType } from '../../enums';
import DigitalLendingPortalEnvironment from '../../enums/DigitalLendingPortalEnvironment';
import getSearchParams from '../../utils/getSearchParams';

export interface StandardBorrowerPortalConfig {
  borrowerType: BorrowerType;
  borrowerLockPeriodDays: number;
}

export interface BorrowerStandardPortalGeneralSettings {
  config: StandardBorrowerPortalConfig;
  accessPasswordExists: boolean;
}

export interface GetGeneralSettingsParams {
  environment: DigitalLendingPortalEnvironment;
}

class BorrowerStandardPortalGeneralSettingsApi {
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

export default BorrowerStandardPortalGeneralSettingsApi;
