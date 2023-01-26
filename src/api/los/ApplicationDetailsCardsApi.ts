import { AuthorizedApiClient } from '../../clients';
import { Card, VariableConfiguration } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

export interface ApplicationVariableConfiguration extends VariableConfiguration {
  productId: string;
}

export type ApplicationDetailsCard = Card<ApplicationVariableConfiguration>;

class ApplicationDetailsCardsApi {
  protected path = '/application-details-cards';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(productId?: string): Promise<ApplicationDetailsCard[]> {
    const urlSearchParams = getSearchParams({ productId } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default ApplicationDetailsCardsApi;
