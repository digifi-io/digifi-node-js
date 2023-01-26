import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import AuthApi, { AuthReference } from './AuthApi';

class PhoneVerificationApi extends AuthApi {
  protected path = '/phone-verification'

  constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public sendMfaCode(phone: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}`, 'POST', {
      phone,
    }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public verifyMfaCode(code: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }
}

export default PhoneVerificationApi;
