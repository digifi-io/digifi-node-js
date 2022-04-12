import AuthApiClient from '../../AuthApiClient';
import { Headers } from 'node-fetch';

class PhoneVerificationApi {
  protected path = '/phone-verification'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public sendMfaCode(phone: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', {
      phone,
    }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  };

  public verifyMfaCode(code: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  };
}

export default PhoneVerificationApi;
