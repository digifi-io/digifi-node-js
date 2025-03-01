import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';
import { AuthResponseParams } from '../../types';
import getSearchParams from '../../utils/getSearchParams';
import { SearchParams } from '../base';
import AuthApi, { AuthReference } from '../base/AuthApi';

export enum AccountStatus {
  Active = 'active',
  Blocked = 'blocked',
  Pending = 'pending',
}

/**
 * @deprecated (will be removed in next major version)
 */
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
  /**
   * @deprecated Use phone and isPhoneVerified instead (will be removed in next major version)
   */
  phones: BaseAccountPhone[];
  isPhoneVerified: boolean;
  lastActiveAt: number | null;
  status: AccountStatus;
  phone?: string;
} & {
  [key in string]: string;
}

interface BaseCreateAccountParams {
  email: string;
  phone?: string;
  password?: string;
}

export interface CreateBorrowerAccountParams extends BaseCreateAccountParams {
  borrowerId: string;
}

export interface CreateIntermediaryAccountParams extends BaseCreateAccountParams {
  intermediaryId: string;
  fullName?: string;
}

export type CreateAccountParams = CreateBorrowerAccountParams | CreateIntermediaryAccountParams;

export interface CreatePasswordValidationTokenResponseParams {
  passwordValidationToken: string
}

export type FindAccountsParams = {
  ids?: string[];
  emails?: string[];
  phones?: string[];
} & {
  [key in 'borrowerIds' | 'intermediaryIds']?: string[];
}

export interface AccountsApi<
  AccountInfo extends BaseAccountInfo = BaseAccountInfo
> {
  findAccountByEmail(email: string): Promise<AccountInfo>;
  createAccount(params: CreateAccountParams, refreshTokenExpirationTimeMinutes?: number): Promise<AuthResponseParams>;
  getCurrentUser(accountAccessToken: string): Promise<AccountInfo>;
  sendUpdatePhoneNumberCode(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void>;
  updatePhoneNumber(code: string, accountAccessToken: string): Promise<void>;
  sendAddPhoneNumberCode(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void>;
  addPhoneNumber(code: string, accountAccessToken: string): Promise<void>;
  deletePhoneNumber(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void>;
  sendUpdateEmailCode(email: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void>;
  updateEmailAddress(code: string, accountAccessToken: string): Promise<void>;
  createPasswordValidationToken(password: string, accountAccessToken: string): Promise<CreatePasswordValidationTokenResponseParams>;
  updatePassword(oldPassword: string, newPassword: string, accountAccessToken: string): Promise<void>;
  find(params: FindAccountsParams): Promise<AccountInfo[]>;
}

export abstract class AccountsRestApi<
  AccountInfo extends BaseAccountInfo = BaseAccountInfo
> extends AuthApi implements AccountsApi<AccountInfo> {
  protected path = '/accounts';

  protected constructor(apiClient: IApiClient, reference: AuthReference) {
    super(apiClient, reference);
  }

  public findAccountByEmail(email: string): Promise<AccountInfo> {
    return this.makeAuthCall(`${this.path}/${email}`);
  }

  public createAccount(params: CreateAccountParams, refreshTokenExpirationTimeMinutes?: number): Promise<AuthResponseParams> {
    return this.makeAuthCall(this.path, 'POST', { ...params, refreshTokenExpirationTimeMinutes });
  }

  public getCurrentUser(accountAccessToken: string): Promise<AccountInfo> {
    return this.makeAuthCall(this.path, 'GET', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public sendUpdatePhoneNumberCode(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/phone`, 'PUT', { phone }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public updatePhoneNumber(code: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/phone/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public sendAddPhoneNumberCode(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/phone`, 'POST', { phone }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public addPhoneNumber(code: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/phone/${code}`, 'POST', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public deletePhoneNumber(phone: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/delete-phone`, 'PUT', { phone }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public sendUpdateEmailCode(email: string, accountAccessToken: string, accountPasswordValidationToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/email`, 'PUT', { email }, {
      headers: new Headers({
        accountAccessToken,
        accountPasswordValidationToken,
      }),
    });
  }

  public updateEmailAddress(code: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/email/${code}`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public createPasswordValidationToken(password: string, accountAccessToken: string): Promise<CreatePasswordValidationTokenResponseParams> {
    return this.makeAuthCall(`${this.path}/password-validation-token`, 'POST', { password }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public updatePassword(oldPassword: string, newPassword: string, accountAccessToken: string): Promise<void> {
    return this.makeAuthCall(`${this.path}/password`, 'PUT', {
      oldPassword,
      newPassword,
    }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }

  public find(params: FindAccountsParams): Promise<AccountInfo[]> {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.makeAuthCall(`${this.path}/search?${urlSearchParams}`);
  }
}
