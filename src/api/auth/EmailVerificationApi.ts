import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import AuthApi, { AuthReference } from './AuthApi';

class EmailVerificationApi extends AuthApi {
  protected path = '/email-verification'

  constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public sendVerificationEmail(accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}`, 'POST', undefined, {
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

export default EmailVerificationApi;
