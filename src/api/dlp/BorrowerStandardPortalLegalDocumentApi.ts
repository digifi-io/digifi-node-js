import { IApiClient } from '../../clients';
import DigitalLendingPortalEnvironment from '../../enums/DigitalLendingPortalEnvironment';
import { UserShort } from '../../types';
import getSearchParams from '../../utils/getSearchParams';

export interface BorrowerStandardPortalLegalDocument {
  id: string;
  name: string;
  body: string;
  showInFooter: boolean;
  showOnSubmitApplication: boolean;
  updatedAt: Date;
  updatedBy?: UserShort | null;
}

export interface GetLegalDocumentsParams {
  environment: DigitalLendingPortalEnvironment;
}

class BorrowerStandardPortalLegalDocumentApi {
  protected path = '/borrowers/standard-portals/legal-documents';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getLegalDocuments(params?: GetLegalDocumentsParams): Promise<BorrowerStandardPortalLegalDocument[]> {
    const urlSearchParams = getSearchParams({
      environment: params?.environment || DigitalLendingPortalEnvironment.Production,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default BorrowerStandardPortalLegalDocumentApi;
