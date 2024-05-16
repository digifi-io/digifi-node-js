import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import AuthApi, { AuthReference } from '../base/AuthApi';

export interface EmailVerificationApi {
  sendVerificationEmail(accountAccessToken: string): Promise<void>;
  verifyEmail(code: string, accountAccessToken: string): Promise<void>;
}

export abstract class EmailVerificationRestApi extends AuthApi implements EmailVerificationApi {
  protected path = '/email-verification'

  protected constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public sendVerificationEmail(accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(this.path, 'POST', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public verifyEmail(code: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }
}
