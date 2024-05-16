import { IApiClient } from '../clients';
import { InvitesRestApi } from './abstract';

export class IntermediaryInvitesRestApi extends InvitesRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }
}
