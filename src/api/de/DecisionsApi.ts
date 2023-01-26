import { PaginationParams, PaginationResult, UserBasic, VariableValue } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import { SearchParams } from '../BaseSystemApi';
import { ExecutionSource, StrategyStatus } from '../../enums';
import getSearchParams from '../../utils/getSearchParams';

export interface DecisionList {
  id: string;
  name: string;
  createdBy: UserBasic | null;
  createdAt: Date;
  source: string;
  strategyNames: string[];
  resultsCount: number;
  executionTime: number;
  resultStatuses: DecisionRunResult[];
}

export interface Decision {
  id: string;
  name: string;
  createdBy: UserBasic | null;
  createdAt: Date;
  source: string;
  applicationId: string | null;
  applicationDisplayId: string | null;
  applicationName: string | null;
  organization: string;
}

export enum DecisionsSortField {
  Date = 'date',
  Source = 'source',
  DecisionName = 'name',
  StrategyName = 'strategyName',
  ExecutionTime = 'executionTime',
  Result = 'passed',
}

export enum DecisionRunResult {
  Passed = 'passed',
  Failed = 'failed',
  Error = 'error',
}

export interface FindDecisionsParams extends PaginationParams<DecisionsSortField>{
  source?: ExecutionSource;
  teamMemberIds?: string[];
  strategyName?: string;
  resultStatuses?: DecisionRunResult[];
  strategyStatus?: StrategyStatus;
  createdAtFrom?: string;
  createdAtTo?: string;
  applicationId?: string;
}

export interface DecisionResult {
  id: string;
  name: string;
  resultType: DecisionRunResult;
  strategyId: string;
  strategyName: string;
  organization: string;
  strategyStatus?: StrategyStatus | string;
  strategyVersion?: number;
  inputs: Record<string, VariableValue>;
  outputs: Record<string, VariableValue>;
  passed: boolean;
  errorMessages: string[];
  declineReasons: string[];
  createdAt: Date;
}

export interface DecisionWithResults extends Decision {
  results: DecisionResult[];
}

class DecisionsApi {
  protected basePath = '/decisions';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public find(params: FindDecisionsParams): Promise<PaginationResult<DecisionList>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    if (params.teamMemberIds) {
      params.teamMemberIds.forEach((teamMemberId) => urlSearchParams.append('team-member-ids', teamMemberId));
    }

    if (params.resultStatuses) {
      params.resultStatuses.forEach((resultStatus) => urlSearchParams.append('result-statuses', resultStatus));
    }

    if (params.strategyName) {
      urlSearchParams.append('strategy-name', params.strategyName);
    }

    if (params.strategyStatus) {
      urlSearchParams.append('strategy-status', params.strategyStatus);
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


    return this.apiClient.makeCall<PaginationResult<DecisionList>>(
      `${this.basePath}?${urlSearchParams}`,
    );
  }

  public findById(id: string): Promise<DecisionWithResults> {
    return this.apiClient.makeCall<DecisionWithResults>(
      `${this.basePath}/${id}`,
    );
  }

  public delete(id: string): Promise<Decision> {
    return this.apiClient.makeCall<Decision>(
      `${this.basePath}/${id}`,
      'DELETE',
    );
  }
}

export default DecisionsApi;
