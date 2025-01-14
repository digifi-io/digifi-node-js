import { IApiClient } from '../clients';
import { FormulaCondition } from '../data/models';
import getSearchParams from '../utils/getSearchParams';

/**
 * @deprecated This interface is deprecated and will be removed in the next major version.
 */
export interface ApplicationDocumentConfiguration {
  id: string;
  name: string;
  productId: string;
  organizationId: string;
  organizationVersion: number;
  position: number;
  required?: boolean;
  folderId?: string | null;
  conditionalDisplayRule?: FormulaCondition | null;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * @deprecated This api is deprecated and will be removed in the next major version.
 */
export interface ApplicationDocumentConfigurationApi {
  find(productId: string): Promise<ApplicationDocumentConfiguration[]>;
}

/**
 * @deprecated This api is deprecated and will be removed in the next major version.
 */
export class ApplicationDocumentConfigurationRestApi implements ApplicationDocumentConfigurationApi {
  protected path = '/application-document-configurations';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(productId: string): Promise<ApplicationDocumentConfiguration[]> {
    const urlSearchParams = getSearchParams({ productId } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}
