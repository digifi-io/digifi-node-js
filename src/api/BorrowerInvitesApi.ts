import { IApiClient } from '../clients';
import { InvitesRestApi } from './abstract';

export class BorrowerInvitesRestApi extends InvitesRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'borrowers');
  }
}
