import { IApiClient } from '../clients';
import { SessionsRestApi } from './abstract';

export class IntermediarySessionsRestApi extends SessionsRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }
}
