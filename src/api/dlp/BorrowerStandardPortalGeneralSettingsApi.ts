import { AuthorizedApiClient } from '../../AuthorizedApiClient';
import { BorrowerType } from '../BorrowersApi';

export interface BorrowerStandardPortalGeneralSettings {
  borrowerType: BorrowerType;
  borrowerLockPeriodDays: number;
}

class BorrowerStandardPortalGeneralSettingsApi {
  protected path = '/borrowers/standard-portals/general-settings';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public getGeneralSettings(): Promise<BorrowerStandardPortalGeneralSettings> {
    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default BorrowerStandardPortalGeneralSettingsApi;
