import { IApiClient } from '../clients';
import DigitalLendingPortalEnvironment from '../enums/DigitalLendingPortalEnvironment';
import getSearchParams from '../utils/getSearchParams';

export interface BorrowerStandardPortalCustomCssConfig {
  stylesheet: string;
}

export interface GetCustomCssConfigParams {
  environment: DigitalLendingPortalEnvironment;
}

export interface BorrowerStandardPortalCustomCssConfigApi {
  getCustomCssConfig(params?: GetCustomCssConfigParams): Promise<BorrowerStandardPortalCustomCssConfig[]>;
}

export class BorrowerStandardPortalCustomCssConfigRestApi implements BorrowerStandardPortalCustomCssConfigApi {
  protected path = '/borrowers/standard-portals/custom-css-config';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getCustomCssConfig(params?: GetCustomCssConfigParams): Promise<BorrowerStandardPortalCustomCssConfig[]> {
    const urlSearchParams = getSearchParams({
      environment: params?.environment || DigitalLendingPortalEnvironment.Production,
    } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}
