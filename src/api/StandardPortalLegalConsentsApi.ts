import { IApiClient } from '../clients';
import DigitalLendingPortalEnvironment from '../enums/DigitalLendingPortalEnvironment';
import PortalUserType from '../enums/PortalUserType';
import { UserShort } from '../types';
import getSearchParams from '../utils/getSearchParams';

export interface StandardPortalLegalConsent {
  id: string;
  name: string;
  body: string;
  showInFooter: boolean;
  showOnSubmitApplication: boolean;
  portalUserType: PortalUserType;
  updatedAt: Date;
  updatedBy?: UserShort | null;
}

export interface GetStandardPortalLegalConsentsParams {
  environment: DigitalLendingPortalEnvironment;
  portalUserType: PortalUserType;
}

export interface StandardPortalLegalConsentsApi {
  getLegalConsents(params: GetStandardPortalLegalConsentsParams): Promise<StandardPortalLegalConsent[]>;
}

export class StandardPortalLegalConsentsRestApi implements StandardPortalLegalConsentsApi {
  protected path = '/standard-portals/legal-consents';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getLegalConsents(params: GetStandardPortalLegalConsentsParams): Promise<StandardPortalLegalConsent[]> {
    const urlSearchParams = getSearchParams({
      environment: params.environment,
      portalUserType: params.portalUserType,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}
