import AuthApiClient from '../../AuthApiClient';
import { Headers } from 'node-fetch';
import { AuthResponseParams } from '../../types';

class SessionsApi {
  protected path = '/sessions'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public createSession(email: string, password: string): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', {
      email,
      password,
    });
  };

  public validateToken(accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/token-status`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  };

  public logout(accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}`, 'DELETE', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  };

  public resignAccessToken(accountRefreshToken: string): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}/`, 'POST', undefined, {
      headers: new Headers({
        accountRefreshToken,
      }),
    });
  };
}

export default SessionsApi;
