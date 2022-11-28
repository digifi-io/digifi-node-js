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
  application?: string;
  applicationDisplayId?: string;
  source?: ExecutionSource;
  result?: ExternalIntegrationResultType;
  teamMemberIds?: string[];
  createdAtFrom?: Date | string;
  createdAtTo?: Date | string;
}

class IntegrationResultsApi {
  protected basePath = '/integration-results';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public find(params: FindIntegrationResultParams): Promise<PaginationResult<CompactIntegrationResult>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    if (params.integrationId) {
      urlSearchParams.append('integration-id', params.integrationId);
    }

    if (params.applicationDisplayId) {
      urlSearchParams.append('application-display-id', params.applicationDisplayId);
    }

    if (params.createdAtFrom) {
      urlSearchParams.append('created-at-from', params.createdAtFrom.toString());
    }

    if (params.createdAtTo) {
      urlSearchParams.append('created-at-to', params.createdAtTo.toString());
    }

    if (params.teamMemberIds) {
      params.teamMemberIds.forEach((teamMemberId) => urlSearchParams.append('team-member-ids', teamMemberId));
    }

    return this.apiClient.makeCall<PaginationResult<CompactIntegrationResult>>(
      `${this.basePath}?${urlSearchParams}`,
    );
  }

  public findById(id: string): Promise<IntegrationResult> {
    return this.apiClient.makeCall<IntegrationResult>(`${this.basePath}/${id}`);
  }

  public delete(id: string): Promise<IntegrationResult> {
    return this.apiClient.makeCall<IntegrationResult>(
      `${this.basePath}/${id}`,
      'DELETE',
    );
  }
}

export default IntegrationResultsApi;
