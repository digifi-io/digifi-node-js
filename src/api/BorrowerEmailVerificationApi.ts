import { IApiClient } from '../clients';
import { EmailVerificationRestApi } from './abstract';

export class BorrowerEmailVerificationRestApi extends EmailVerificationRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'borrowers');
  }
}
