import { AuthApiClient } from '../../clients';
import { Headers } from 'node-fetch';

class EmailVerificationApi {
  protected path = '/email-verification'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public sendVerificationEmail(accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public verifyEmail(code: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }
}

export default EmailVerificationApi;
