import { IApiClient } from '../../clients';
import { BorrowerType } from '../../enums';

export interface BorrowerStandardPortalGeneralSettings {
  borrowerType: BorrowerType;
  borrowerLockPeriodDays: number;
}

class BorrowerStandardPortalGeneralSettingsApi {
  protected path = '/borrowers/standard-portals/general-settings';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getGeneralSettings(): Promise<BorrowerStandardPortalGeneralSettings> {
    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default BorrowerStandardPortalGeneralSettingsApi;
