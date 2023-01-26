import { AuthApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import { AuthResponseParams } from '../../types';

class SessionsApi {
  protected path = '/sessions'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public createSession(
    email: string,
    password: string,
    refreshTokenExpirationTimeMinutes?: number,
  ): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', {
      email,
      password,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public createSessionWithPhoneVerificationCode(
    phoneVerificationCode: string,
    refreshTokenExpirationTimeMinutes?: number,
  ): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', {
      phoneVerificationCode,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public sendPhoneVerificationCode(phone: string): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}/${phone}`, 'POST');
  }

  public validateToken(accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/token-status`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public logout(accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}`, 'DELETE', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public resignAccessToken(accountRefreshToken: string): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}/`, 'POST', undefined, {
      headers: new Headers({
        accountRefreshToken,
      }),
    });
  }
}

export default SessionsApi;
