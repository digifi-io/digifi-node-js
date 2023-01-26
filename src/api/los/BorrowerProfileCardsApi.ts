import { AuthorizedApiClient } from '../../clients';
import { BorrowerType } from '../../enums';
import { VariableConfiguration, Card, Variable } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

interface BorrowerVariableConfiguration<VariableConfig extends Variable = Variable>
  extends VariableConfiguration<VariableConfig> {
  borrowerType: BorrowerType;
}

export interface BorrowerProfileCard<VariableConfig extends Variable = Variable>
  extends Card<BorrowerVariableConfiguration<VariableConfig>> {
  borrowerType: BorrowerType;
}

class BorrowerProfileCardsApi {
  protected path = '/borrower-profile-cards';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(borrowerType?: BorrowerType): Promise<BorrowerProfileCard[]> {
    const urlParams = getSearchParams({ borrowerType } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlParams}`);
  }
}

export default BorrowerProfileCardsApi;
