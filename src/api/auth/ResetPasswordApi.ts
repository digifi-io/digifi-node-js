import { IApiClient } from '../../clients';
import AuthApi, { AuthReference } from './AuthApi';

export type GetResetPasswordTokenInfoResponseParams = {
  accountId: string;
} & {
  [key in 'borrowerId' | 'intermediaryId']: string;
};

class ResetPasswordApi extends AuthApi {
  protected path = '/reset-password'

  constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public sendResetPasswordLink(email: string): Promise<void> {
    return this.makeAuthCall(`${this.path}`, 'POST', {
      email,
    });
  }

  public resetPassword(password: string, resetPasswordToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/${resetPasswordToken}`, 'PUT', {
      password,
    });
  }

  public getResetPasswordTokenInfo(resetPasswordToken: string): Promise<GetResetPasswordTokenInfoResponseParams> {
    return this.makeAuthCall(`${this.path}/${resetPasswordToken}`, 'GET');
  }
}

export default ResetPasswordApi;
