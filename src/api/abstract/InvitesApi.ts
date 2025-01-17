import { IApiClient } from '../../clients';
import { AuthResponseParams } from '../../types';
import AuthApi, { AuthReference } from '../base/AuthApi';

export type GetInviteInfoResponseParams = {
  accountId: string;
} & {
  [key in 'borrowerId' | 'intermediaryId']: string;
};

export interface IAcceptInviteParams {
  token: string;
  password: string;
  phone: string;
  fullName?: string;
}

export interface InvitesApi {
  acceptInvite(params: IAcceptInviteParams, refreshTokenExpirationTimeMinutes?: number): Promise<AuthResponseParams>;
  getInviteInfo(token: string): Promise<GetInviteInfoResponseParams>;
}

export abstract class InvitesRestApi extends AuthApi implements InvitesApi {
  protected path = '/invites'

  protected constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public acceptInvite(
    { token, ...restParams }: IAcceptInviteParams,
    refreshTokenExpirationTimeMinutes?: number,
  ): Promise<AuthResponseParams> {
    return this.makeAuthCall(`${this.path}/${token}`, 'POST', {
      ...restParams,
      refreshTokenExpirationTimeMinutes,
    });
  }

  public getInviteInfo(token: string): Promise<GetInviteInfoResponseParams> {
    return this.makeAuthCall(`${this.path}/${token}`);
  }
}
