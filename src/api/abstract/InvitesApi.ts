import { IApiClient } from '../../clients';
import { AuthResponseParams } from '../../types';
import AuthApi, { AuthReference } from '../base/AuthApi';

export type GetInviteInfoResponseParams = {
  accountId: string;
} & {
  [key in 'borrowerId' | 'intermediaryId']: string;
};

export interface InvitesApi {
  acceptInvite(password: string, phone: string, token: string, refreshTokenExpirationTimeMinutes?: number): Promise<AuthResponseParams>;
  getInviteInfo(token: string): Promise<GetInviteInfoResponseParams>;
}

export abstract class InvitesRestApi extends AuthApi implements InvitesApi {
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

  public getInviteInfo(token: string): Promise<GetInviteInfoResponseParams> {
    return this.makeAuthCall(`${this.path}/${token}`);
  }
}
