import { IApiClient } from '../../clients';
import { BorrowerType } from '../../enums';
import PortalEnvironment from '../../enums/PortalEnvironment';
import getSearchParams from '../../utils/getSearchParams';

export interface BorrowerStandardPortalGeneralSettings {
  borrowerType: BorrowerType;
  borrowerLockPeriodDays: number;
}

export interface GetGeneralSettingsParams {
  environment: PortalEnvironment;
}

class BorrowerStandardPortalGeneralSettingsApi {
  protected path = '/borrowers/standard-portals/general-settings';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getGeneralSettings(params?: GetGeneralSettingsParams): Promise<BorrowerStandardPortalGeneralSettings> {
    const urlSearchParams = getSearchParams({
      environment: params?.environment || PortalEnvironment.Production,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default BorrowerStandardPortalGeneralSettingsApi;
