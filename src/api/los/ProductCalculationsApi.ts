import { AuthorizedApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { VariableType } from '../../enums';
import { SearchParams } from '../BaseSystemApi';

export interface ProductCalculation {
  id: string;
  code: string;
  productId: string;
  organizationId: string;
  variable: {
    id: string;
    dataType: VariableType;
    systemName: string;
    displayName: string;
  };
  requiredVariables: string[];
}

export interface GetProductCalculationsParams {
  productId?: string;
  variableId?: string;
  search?: string;
}

export default class ProductCalculationsApi {
  protected path = '/product-calculations';

  constructor(
    protected apiClient: AuthorizedApiClient,
  ) {
  }

  public getProductCalculations(params?: GetProductCalculationsParams): Promise<ProductCalculation[]> {
    const queryParams = getSearchParams((params || {}) as SearchParams);

    return this.apiClient.makeCall<ProductCalculation[]>(`/${this.path}/?${queryParams}`);
  }
}
