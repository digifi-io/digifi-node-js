import { AccountsRestApi, BaseAccountInfo } from './abstract';
import { IApiClient } from '../clients';
import { Headers } from 'node-fetch';

export type IntermediaryAccountInfo = BaseAccountInfo & {
  fullName?: string;
}

export class IntermediaryAccountsRestApi extends AccountsRestApi<IntermediaryAccountInfo> {
  constructor(apiClient: IApiClient) {
    super(apiClient, 'intermediaries');
  }

  public updateFullName(fullName: string, accountAccessToken: string): Promise<IntermediaryAccountInfo> {
    return this.makeAuthCall(`${this.path}/full-name`, 'PUT', undefined, {
      headers: new Headers({
        accountAccessToken,
      }),
    });
  }
}
