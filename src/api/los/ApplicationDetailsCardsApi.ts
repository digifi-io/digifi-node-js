import { AuthorizedApiClient } from '../../clients';
import { Card, VariableConfiguration, Variable } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

export interface ApplicationVariableConfiguration<VariableConfig extends Variable = Variable>
  extends VariableConfiguration<VariableConfig> {
  productId: string;
}

export interface ApplicationDetailsCard<VariableConfig extends Variable = Variable>
  extends Card<ApplicationVariableConfiguration<VariableConfig>> {
  productId: string;
}

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
