import { IApiClient } from '../../clients';
import { BorrowerType } from '../../enums';
import { VariableConfiguration, Card } from '../../data/models';
import getSearchParams from '../../utils/getSearchParams';

interface BorrowerVariableConfiguration extends VariableConfiguration {
  borrowerType: BorrowerType;
}

interface BorrowerProfileCardAttributes {
  borrowerType: BorrowerType;
}

export type BorrowerProfileCard = Card<BorrowerVariableConfiguration> & BorrowerProfileCardAttributes;

class BorrowerProfileCardsApi {
  protected path = '/borrower-profile-cards';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(borrowerType?: BorrowerType): Promise<BorrowerProfileCard[]> {
    const urlParams = getSearchParams({ borrowerType } as Record<string, string>);

    return this.apiClient.makeCall(`${this.path}?${urlParams}`);
  }
}

export default BorrowerProfileCardsApi;
