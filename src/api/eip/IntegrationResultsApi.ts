import { PaginationParams, PaginationResult } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import { ExecutionSource, ExternalIntegrationResultType } from '../../enums';
import { SearchParams } from '../BaseSystemApi';
import getSearchParams from '../../utils/getSearchParams';
import { CompactIntegrationResult, IntegrationResult } from '../../data/models';

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

class IntegrationResultsApi {
  protected path = '/integration-results';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public find(params: FindIntegrationResultParams): Promise<PaginationResult<CompactIntegrationResult>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    if (params.integrationId) {
      urlSearchParams.append('integrationId', params.integrationId);
    }

    if (params.applicationDisplayId) {
      urlSearchParams.append('applicationDisplayId', params.applicationDisplayId);
    }

    if (params.createdAtFrom) {
      urlSearchParams.append('createdAtFrom', params.createdAtFrom.toString());
    }

    if (params.createdAtTo) {
      urlSearchParams.append('createdAtTo', params.createdAtTo.toString());
    }

    if (params.teamMembersIds) {
      params.teamMembersIds.forEach((teamMemberId) => urlSearchParams.append('teamMembersIds', teamMemberId));
    }

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

export default IntegrationResultsApi;
