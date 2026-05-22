import { IApiClient } from '../clients';
import DigitalLendingPortalEnvironment from '../enums/DigitalLendingPortalEnvironment';
import { AnyObject, UserShort } from '../types';
import getSearchParams from '../utils/getSearchParams';

export interface BorrowerStandardPortalLegalConsent {
  id: string;
  name: string;
  body: string;
  bodySource: AnyObject | null;
  showInFooter: boolean;
  showOnSubmitApplication: boolean;
  externalConsentUrl?: string | null;
  updatedAt: Date;
  updatedBy?: UserShort | null;
}

export interface GetLegalConsentsParams {
  environment: DigitalLendingPortalEnvironment;
}

export interface BorrowerStandardPortalLegalConsentsApi {
  getLegalConsents(params?: GetLegalConsentsParams): Promise<BorrowerStandardPortalLegalConsent[]>;
}

/**
 * @deprecated Use StandardPortalLegalConsentsRestApi instead
 */
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
