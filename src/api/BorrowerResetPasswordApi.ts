import { IApiClient } from '../clients';
import { ResetPasswordRestApi } from './abstract';

export class BorrowerResetPasswordRestApi extends ResetPasswordRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'borrowers');
  }
}
