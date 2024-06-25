import { IApiClient } from '../clients';
import DigitalLendingPortalEnvironment from '../enums/DigitalLendingPortalEnvironment';
import { UserShort } from '../types';
import getSearchParams from '../utils/getSearchParams';

export interface BorrowerStandardPortalLegalConsent {
  id: string;
  name: string;
  body: string;
  showInFooter: boolean;
  showOnSubmitApplication: boolean;
  updatedAt: Date;
  updatedBy?: UserShort | null;
}

export interface GetLegalConsentsParams {
  environment: DigitalLendingPortalEnvironment;
}

export interface BorrowerStandardPortalLegalConsentsApi {
  getLegalConsents(params?: GetLegalConsentsParams): Promise<BorrowerStandardPortalLegalConsent[]>;
}

export class BorrowerStandardPortalLegalConsentsRestApi implements BorrowerStandardPortalLegalConsentsApi {
  protected path = '/borrowers/standard-portals/legal-documents';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getLegalConsents(params?: GetLegalConsentsParams): Promise<BorrowerStandardPortalLegalConsent[]> {
    const urlSearchParams = getSearchParams({
      environment: params?.environment || DigitalLendingPortalEnvironment.Production,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}
