import AuthApiClient from '../../AuthApiClient';

export type GetResetPasswordTokenInfoResponseParams = {
  accountId: string;
} & {
  [key in 'borrowerId' | 'intermediaryId']: string;
};

class ResetPasswordApi {
  protected path = '/reset-password'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public sendResetPasswordLink(email: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', {
      email,
    });
  }

  public resetPassword(password: string, resetPasswordToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/${resetPasswordToken}`, 'PUT', {
      password,
    });
  }

  public getResetPasswordTokenInfo(resetPasswordToken: string): Promise<GetResetPasswordTokenInfoResponseParams> {
    return this.apiClient.makeCall(`${this.path}/${resetPasswordToken}`, 'GET');
  }
}

export default ResetPasswordApi;
