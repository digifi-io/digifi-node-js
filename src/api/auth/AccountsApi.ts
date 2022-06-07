import AuthApiClient from '../../AuthApiClient';
import { Headers } from 'node-fetch';
import { AuthResponseParams, TableData } from '../../types';
import getSearchParams from '../../utils/getSearchParams';

export enum AccountStatus {
  Active = 'active',
  Blocked = 'blocked',
  Pending = 'pending',
}

export interface BaseAccountPhone {
  value: string;
  verified: boolean;
  deletedAt?: Date;
}

export type BaseAccountInfo = {
  id: string;
  isEmailNotVerified: true | undefined;
  isMfaIncomplete: true | undefined;
  email: string;
  phones: BaseAccountPhone[];
  lastActiveAt: number | null;
  status: AccountStatus;
} & {
  [key in string]: string;
}

export type CreateAccountParams = {
  password: string;
  email: string;
  phone: string;
} & {
  [key in string]: string;
};

export interface CreatePasswordValidationTokenResponseParams {
  passwordValidationToken: string
}

class AccountsApi {
  protected path = '/accounts'

  constructor(
    private apiClient: AuthApiClient,
  ) {}

  public findAccountByEmail(email: string): Promise<BaseAccountInfo> {
    return this.apiClient.makeCall(`${this.path}/${email}`);
  }

  public createAccount(params: CreateAccountParams): Promise<AuthResponseParams> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', params);
  }

  public getCurrentUser(accountAccessToken: string): Promise<BaseAccountInfo> {
    return this.apiClient.makeCall(`${this.path}`, 'GET', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public sendUpdatePhoneNumberCode(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/phone`, 'PUT', { phone }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public updatePhoneNumber(code: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/phone/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public sendAddPhoneNumberCode(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/phone`, 'POST', { phone }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public addPhoneNumber(code: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/phone/${code}`, 'POST', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public deletePhoneNumber(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/delete-phone`, 'PUT', { phone }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public sendUpdateEmailCode(email: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/email`, 'PUT', { email }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public updateEmailAddress(code: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/email/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public createPasswordValidationToken(password: string, accountAccessToken: string): Promise<CreatePasswordValidationTokenResponseParams> {
    return this.apiClient.makeCall(`${this.path}/password-validation-token`, 'POST', { password }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public updatePassword(oldPassword: string, newPassword: string, accountAccessToken: string): Promise<void> {
    return this.apiClient.makeCall(`${this.path}/password`, 'PUT', {
      oldPassword,
      newPassword,
    }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public find(params: Record<string, string | Array<string>> | Array<string[]> = {}): Promise<BaseAccountInfo[]> {
    const urlSearchParams = getSearchParams(params);

    return this.apiClient.makeCall(`/${this.path}/search?${urlSearchParams}`);
  }
}

export default AccountsApi;
