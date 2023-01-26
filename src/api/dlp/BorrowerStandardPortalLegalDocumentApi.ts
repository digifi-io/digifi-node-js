import { AuthorizedApiClient } from '../../clients';
import { UserShort } from '../../types';

export interface BorrowerStandardPortalLegalDocument {
  id: string;
  name: string;
  body: string;
  showInFooter: boolean;
  showOnSubmitApplication: boolean;
  updatedAt: Date;
  updatedBy?: UserShort | null;
}

class BorrowerStandardPortalLegalDocumentApi {
  protected path = '/borrowers/standard-portals/legal-documents';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public getLegalDocuments(): Promise<BorrowerStandardPortalLegalDocument[]> {
    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default BorrowerStandardPortalLegalDocumentApi;
