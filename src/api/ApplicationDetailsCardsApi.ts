import { AuthorizedApiClient } from '../AuthorizedApiClient';
import { CardViewModel } from '../data/models/CardViewModel';
import { VariableViewModel } from '../data/models/VariableViewModel';
import { VariableConfigurationViewModel } from '../data/models/VariableConfigurationViewModel';

export interface ApplicationVariableConfigurationViewModel<Variable extends VariableViewModel = VariableViewModel>
  extends VariableConfigurationViewModel<Variable> {
  productId: string;
}

export interface ApplicationDetailsCardViewModel<Variable extends VariableViewModel = VariableViewModel>
  extends CardViewModel<ApplicationVariableConfigurationViewModel<Variable>> {
  productId: string;
}

class ApplicationDetailsCardsApi {
  protected path = '/application-details-cards';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(productId?: string): Promise<ApplicationDetailsCardViewModel[]> {
    const urlSearchParams = new URLSearchParams();

    if (productId) {
      urlSearchParams.append('productId', productId);
    }

    return this.apiClient.makeCall(`${this.path}?${urlSearchParams}`);
  }
}

export default ApplicationDetailsCardsApi;
