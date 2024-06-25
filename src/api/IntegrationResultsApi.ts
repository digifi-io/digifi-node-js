import { PaginationParams, PaginationResult } from '../types';
import { IApiClient } from '../clients';
import { ExecutionSource, ExternalIntegrationResultType } from '../enums';
import { SearchParams } from './base';
import getSearchParams from '../utils/getSearchParams';
import { CompactIntegrationResult, IntegrationResult } from '../data/models';

export enum IntegrationResultSortField {
  Name = 'integrationName',
  Source = 'source',
  ExecutionTime = 'executionTime',
  Result = 'result',
  Date = 'date'
}

export interface FindIntegrationResultParams extends PaginationParams<IntegrationResultSortField>{
  integrationId?: string;
  applicationId?: string;
  applicationDisplayId?: string;
  source?: ExecutionSource;
  result?: ExternalIntegrationResultType;
  teamMembersIds?: string[];
  createdAtFrom?: Date | string;
  createdAtTo?: Date | string;
}

export interface IntegrationResultsApi {
  find(params: FindIntegrationResultParams): Promise<PaginationResult<CompactIntegrationResult>>;
  findById(id: string): Promise<IntegrationResult>;
  delete(id: string): Promise<IntegrationResult>;
}

export class IntegrationResultsRestApi implements IntegrationResultsApi {
  protected path = '/integration-results';

  constructor(protected apiClient: IApiClient) {}

  public find(params: FindIntegrationResultParams): Promise<PaginationResult<CompactIntegrationResult>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall<PaginationResult<CompactIntegrationResult>>(
      `${this.path}?${urlSearchParams}`,
    );
  }

  public findById(id: string): Promise<IntegrationResult> {
    return this.apiClient.makeCall<IntegrationResult>(`${this.path}/${id}`);
  }

  public delete(id: string): Promise<IntegrationResult> {
    return this.apiClient.makeCall<IntegrationResult>(
      `${this.path}/${id}`,
      'DELETE',
    );
  }
}
