import { IApiClient } from '../clients';
import { PhoneVerificationRestApi } from './abstract';

export class IntermediaryPhoneVerificationRestApi extends PhoneVerificationRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }
}
