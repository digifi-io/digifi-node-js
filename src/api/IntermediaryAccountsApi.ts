import { AccountsApi, AccountsRestApi, BaseAccountInfo } from './abstract';
import { IApiClient } from '../clients';
import { Headers } from 'node-fetch';

export type IntermediaryAccountInfo = BaseAccountInfo & {
  fullName?: string;
}

export interface IntermediaryAccountsApi extends AccountsApi<IntermediaryAccountInfo> {
  updateFullName(fullName: string, accountAccessToken: string): Promise<IntermediaryAccountInfo>;
}

export class IntermediaryAccountsRestApi extends AccountsRestApi<IntermediaryAccountInfo> implements IntermediaryAccountsApi {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }

  public updateFullName(fullName: string, accountAccessToken: string): Promise<IntermediaryAccountInfo> {
    return this.makeAuthCall(`${this.path}/full-name`, 'PUT', { fullName }, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }
}
