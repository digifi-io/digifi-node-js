import AuthApiClient from '../../AuthApiClient';
import { AuthResponseParams } from '../../types';

export type GetInviteInfoResponseParams = {
  accountId: string;
} & {
  [key in 'borrowerId' | 'intermediaryId']: string;
};

class InvitesApi {
  protected path = '/invites'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public acceptInvite(password: string, phone: string, token: string, refreshTokenExpirationTimeMinutes?: number): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}/${token}`, 'POST', {
      password,
      phone,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public getInviteInfo(token: string): Promise<GetInviteInfoResponseParams>{
    return this.apiClient.makeCall(`${this.path}/${token}`);
  }
}

export default InvitesApi;
