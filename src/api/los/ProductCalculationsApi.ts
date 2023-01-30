import { IApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { VariableType } from '../../enums';
import { SearchParams } from '../BaseSystemApi';

export interface ProductCalculation {
  id: string;
  formula: string;
  productId: string;
  organizationId: string;
  organizationVersion: number | null;
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

export default class ProductCalculationsApi {
  protected path = '/product-calculations';

  constructor(
    protected apiClient: IApiClient,
  ) {}

  public find(productId: string): Promise<ProductCalculation[]> {
    const queryParams = getSearchParams({ productId } as Record<string, string>);

    return this.apiClient.makeCall<ProductCalculation[]>(`${this.path}/?${queryParams}`);
  }
}
