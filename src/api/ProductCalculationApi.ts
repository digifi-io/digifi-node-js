import { IApiClient } from '../ApiClient';
import { VariableType } from './core/VariablesApi';

export interface ProductCalculation {
  id: string;
  code: string;
  requiredVariables: Array<string>;
  variable: {
    id: string;
    systemName: string;
    displayName: string;
    dataType: VariableType;
  };
  productId: string;
  createdAt: Date;
}

export interface GetProductCalculationsParams {
  productId?: string;
  variableId?: string;
  search?: string;
}

export default class ProductCalculationApi {
  protected path = '/product-calculations';

  constructor(
    protected apiClient: IApiClient,
  ) {
  }

  public getProductCalculations(params?: GetProductCalculationsParams) {
    const queryParams = new URLSearchParams();

    if (params?.productId) {
      queryParams.set('productId', params.productId);
    }

    if (params?.variableId) {
      queryParams.set('productId', params.variableId);
    }

    if (params?.search) {
      queryParams.set('productId', params.search);
    }

    return this.apiClient.makeCall<ProductCalculation[]>(`/${this.path}/?${queryParams}`);
  }
}
