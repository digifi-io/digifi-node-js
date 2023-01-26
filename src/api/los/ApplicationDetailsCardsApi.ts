import { AuthorizedApiClient } from '../../clients';
import { Card, VariableConfiguration } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

export interface ApplicationVariableConfiguration extends VariableConfiguration {
  product: string;
}

export interface ApplicationDetailsCardAttributes {
  product: string;
}

export type ApplicationDetailsCard = Card<ApplicationVariableConfiguration> & ApplicationDetailsCardAttributes;

class ApplicationDetailsCardsApi {
  protected path = '/application-details-cards';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(product?: string): Promise<ApplicationDetailsCard[]> {
    const urlSearchParams = getSearchParams({ product } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default ApplicationDetailsCardsApi;
