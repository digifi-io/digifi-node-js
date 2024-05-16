import { IApiClient } from '../clients';
import { PhoneVerificationRestApi } from './abstract';

export class BorrowerPhoneVerificationRestApi extends PhoneVerificationRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'borrowers');
  }
}
