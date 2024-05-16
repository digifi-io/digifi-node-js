import { IApiClient } from '../clients';
import { EmailVerificationRestApi } from './abstract';

export class IntermediaryEmailVerificationRestApi extends EmailVerificationRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }
}
