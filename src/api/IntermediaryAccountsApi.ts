import { AccountsRestApi } from './abstract';
import { IApiClient } from '../clients';

export class IntermediaryAccountsRestApi extends AccountsRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }
}
