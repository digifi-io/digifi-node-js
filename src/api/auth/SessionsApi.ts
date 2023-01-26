import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import { AuthResponseParams } from '../../types';
import AuthApi, { AuthReference } from './AuthApi';

class SessionsApi extends AuthApi {
  protected path = '/sessions'

  constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public createSession(
    email: string,
    password: string,
    refreshTokenExpirationTimeMinutes?: number,
  ): Promise<AuthResponseParams> {
    return this.makeAuthCall(`${this.path}`, 'POST', {
      email,
      password,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public createSessionWithPhoneVerificationCode(
    phoneVerificationCode: string,
    refreshTokenExpirationTimeMinutes?: number,
  ): Promise<AuthResponseParams> {
    return this.makeAuthCall(`${this.path}`, 'POST', {
      phoneVerificationCode,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public sendPhoneVerificationCode(phone: string): Promise<AuthResponseParams> {
    return this.makeAuthCall(`${this.path}/${phone}`, 'POST');
  }

  public validateToken(accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/token-status`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public logout(accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}`, 'DELETE', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public resignAccessToken(accountRefreshToken: string): Promise<AuthResponseParams> {
    return this.makeAuthCall(`${this.path}/`, 'POST', undefined, {
      headers: new Headers({
        accountRefreshToken,
      }),
    });
  }
}

export default SessionsApi;
