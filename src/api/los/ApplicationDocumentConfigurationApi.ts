import { AuthorizedApiClient } from '../../clients';
import { FormulaCondition } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

export interface ApplicationDocumentConfiguration {
  id: string;
  name: string;
  productId: string;
  organizationId: string;
  position: number;
  required?: boolean;
  folderId?: string | null;
  conditionalDisplayRule?: FormulaCondition | null;
}

class ApplicationDocumentConfigurationApi {
  protected path = '/application-document-configurations';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(productId?: string): Promise<ApplicationDocumentConfiguration[]> {
    const urlSearchParams = getSearchParams({ productId } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default ApplicationDocumentConfigurationApi;
