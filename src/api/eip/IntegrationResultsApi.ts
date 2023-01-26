import { PaginationParams, PaginationResult, UserBasic, VariableValue } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import { ExecutionSource, ExternalIntegrationResultType } from '../../enums';
import { SearchParams } from '../BaseSystemApi';
import getSearchParams from '../../utils/getSearchParams';

export enum IntegrationResultSortField {
  Name = 'integrationName',
  Source = 'source',
  ExecutionTime = 'executionTime',
  Result = 'result',
  Date = 'date'
}

export interface FindIntegrationResultParams extends PaginationParams<IntegrationResultSortField>{
  integrationId?: string;
  source?: ExecutionSource;
  result?: ExternalIntegrationResultType;
  createdByIds?: string[];
  createdAtFrom?: string;
  createdAtTo?: string;
  applicationId?: string;
}

export interface IntegrationResultCompact {
  id: string;
  integrationId: string;
  integrationName: string;
  createdAt: Date;
  updatedAt: Date;
  source: ExecutionSource;
  executionTime: number;
  result: ExternalIntegrationResultType;
  createdBy: UserBasic | null;
}

export interface DetailedIntegrationResult extends IntegrationResultCompact {
  inputs: Record<string, VariableValue>;
  outputs: Record<string, VariableValue>;
  statusCode: number;
  applicationId?: string;
  applicationName?: string;
}

class IntegrationResultsApi {
  protected basePath = '/integration-results';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public find(params: FindIntegrationResultParams): Promise<PaginationResult<IntegrationResultCompact>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    if (params.integrationId) {
      urlSearchParams.append('integration-id', params.integrationId);
    }

    if (params.applicationId) {
      urlSearchParams.append('application-id', params.applicationId);
    }

    if (params.createdAtFrom) {
      urlSearchParams.append('created-at-from', params.createdAtFrom.toString());
    }

    if (params.createdAtTo) {
      urlSearchParams.append('created-at-to', params.createdAtTo.toString());
    }

    return this.apiClient.makeCall<PaginationResult<IntegrationResultCompact>>(
      `${this.basePath}?${urlSearchParams}`,
    );
  }

  public findById(id: string): Promise<DetailedIntegrationResult> {
    return this.apiClient.makeCall<DetailedIntegrationResult>(`${this.basePath}/${id}`);
  }

  public delete(id: string): Promise<DetailedIntegrationResult> {
    return this.apiClient.makeCall<DetailedIntegrationResult>(
      `${this.basePath}/${id}`,
      'DELETE',
    );
  }
}

export default IntegrationResultsApi;
