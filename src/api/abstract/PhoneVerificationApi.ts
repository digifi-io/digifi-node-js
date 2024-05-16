import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import AuthApi, { AuthReference } from '../base/AuthApi';

export interface PhoneVerificationApi {
  sendMfaCode(phone: string, accountAccessToken: string): Promise<void>;
  verifyMfaCode(code: string, accountAccessToken: string): Promise<void>;
}

export abstract class PhoneVerificationRestApi extends AuthApi implements PhoneVerificationApi {
  protected path = '/phone-verification'

  constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public sendMfaCode(phone: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(this.path, 'POST', {
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
