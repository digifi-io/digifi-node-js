import { IApiClient } from '../clients';
import { SessionsRestApi } from './abstract';

export class BorrowerSessionsRestApi extends SessionsRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'borrowers');
  }
}
