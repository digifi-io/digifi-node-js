import { AuthorizedApiClient } from '../AuthorizedApiClient';
import { FormulaConditionViewModel } from '../data/models/FormulaConditionViewModel';

export interface ApplicationDocumentConfigurationViewModel {
  id: string;
  name: string;
  productId: string;
  organizationId: string;
  position: number;
  required?: boolean;
  folderId?: string | null;
  conditionalDisplayRule?: FormulaConditionViewModel | null;
}

class ApplicationDocumentConfigurationApi {
  protected path = '/application-document-configurations';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(productId?: string): Promise<ApplicationDocumentConfigurationViewModel> {
    const urlSearchParams = new URLSearchParams();

    if (productId) {
      urlSearchParams.append('productId', productId);
    }

    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default ApplicationDocumentConfigurationApi;
