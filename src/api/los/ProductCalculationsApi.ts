import { AuthorizedApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { VariableType } from '../../enums';
import { SearchParams } from '../BaseSystemApi';

export interface ProductCalculation {
  id: string;
  code: string;
  product: string;
  organization: string;
  organizationVersion: number | null;
  requiredVariables: string[];
  createdAt?: Date;
  updatedAt?: Date;
  variable: {
    id: string;
    dataType: VariableType;
    systemName: string;
    name: string;
  };
}

export interface GetProductCalculationsParams {
  product?: string;
  variable?: string;
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
