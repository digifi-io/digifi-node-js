import { IApiClient } from '../../clients';
import { AuthResponseParams } from '../../types';
import AuthApi, { AuthReference } from './AuthApi';

export type GetInviteInfoResponseParams = {
  accountId: string;
} & {
  [key in 'borrowerId' | 'intermediaryId']: string;
};

class InvitesApi extends AuthApi {
  protected path = '/invites'

  constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public acceptInvite(password: string, phone: string, token: string, refreshTokenExpirationTimeMinutes?: number): Promise<AuthResponseParams> {
    return this.makeAuthCall(`${this.path}/${token}`, 'POST', {
      password,
      phone,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public getInviteInfo(token: string): Promise<GetInviteInfoResponseParams>{
    return this.makeAuthCall(`${this.path}/${token}`);
  }
}

export default InvitesApi;
