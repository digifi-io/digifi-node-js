import { AuthorizedApiClient } from '../AuthorizedApiClient';
import { BorrowerType } from '../api/BorrowersApi';
import { VariableViewModel } from '../data/models/VariableViewModel';
import { VariableConfigurationViewModel } from '../data/models/VariableConfigurationViewModel';
import { CardViewModel } from '../data/models/CardViewModel';

export interface BorrowerVariableConfigurationViewModel<Variable extends VariableViewModel = VariableViewModel>
  extends VariableConfigurationViewModel<Variable> {
  borrowerType: BorrowerType;
}

export interface BorrowerProfileCardViewModel<Variable extends VariableViewModel = VariableViewModel>
  extends CardViewModel<BorrowerVariableConfigurationViewModel<Variable>> {
  borrowerType: BorrowerType;
}

class BorrowerProfileCardsApi {
  protected path = '/borrower-profile-cards';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(): Promise<BorrowerProfileCardViewModel> {
    return this.apiClient.makeCall(`${this.path}`);
  }
}

export default BorrowerProfileCardsApi;
