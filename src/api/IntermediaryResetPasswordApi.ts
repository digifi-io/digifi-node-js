import { IApiClient } from '../clients';
import { ResetPasswordRestApi } from './abstract';

export class IntermediaryResetPasswordRestApi extends ResetPasswordRestApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }
}
