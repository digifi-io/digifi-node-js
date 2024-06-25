import { IApiClient } from '../clients';
import getSearchParams from '../utils/getSearchParams';
import { VariableType } from '../enums';

export interface ProductCalculation {
  id: string;
  formula: string;
  formulaCompilation?: string;
  formulaCompilationVersion?: number;
  compressionApplied?: boolean;
  productId: string;
  organizationId: string;
  organizationVersion: number;
  formulaRequiredVariables: string[];
  createdAt?: Date;
  updatedAt?: Date;
  variable: {
    id: string;
    dataType: VariableType;
    systemName: string;
    name: string;
  };
}

export interface ProductCalculationsApi {
  find(productId: string): Promise<ProductCalculation[]>;
}

export class ProductCalculationsRestApi implements ProductCalculationsApi {
  protected path = '/product-calculations';

  constructor(
    protected apiClient: IApiClient,
  ) {}

  public find(productId: string): Promise<ProductCalculation[]> {
    const queryParams = getSearchParams({ productId } as Record<string, string>);

    return this.apiClient.makeCall<ProductCalculation[]>(`${this.path}?${queryParams}`);
  }
}
