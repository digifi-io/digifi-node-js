import { AccountsRestApi } from './abstract';
import { IApiClient } from '../clients';

export class BorrowerAccountsRestApi extends AccountsRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'borrowers');
  }
}
