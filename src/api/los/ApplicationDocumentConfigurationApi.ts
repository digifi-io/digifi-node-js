import { AuthorizedApiClient } from '../../clients';
import { FormulaCondition } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

export interface ApplicationDocumentConfiguration {
  id: string;
  name: string;
  product: string;
  organization: string;
  organizationVersion: number | null;
  position: number;
  required?: boolean;
  folder?: string | null;
  conditionalDisplayRule?: FormulaCondition | null;
  createdAt?: Date;
  updatedAt?: Date;
}

class ApplicationDocumentConfigurationApi {
  protected path = '/application-document-configurations';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(product?: string): Promise<ApplicationDocumentConfiguration[]> {
    const urlSearchParams = getSearchParams({ product } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default ApplicationDocumentConfigurationApi;
