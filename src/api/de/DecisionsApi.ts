import { PaginationParams, PaginationResult, UserBasic } from '../../types';
import { IApiClient } from '../../clients';
import { BaseSystemApi, SearchParams } from '../BaseSystemApi';
import { DecisionRunResult, ExecutionSource } from '../../enums';
import getSearchParams from '../../utils/getSearchParams';

export interface Decision {
  id: string;
  name: string;
  source: ExecutionSource;
  strategyNames: string[];
  strategiesIds: string[];
  resultsCount: number;
  applicationId: string | null;
  applicationDisplayId: string | null;
  applicationName: string | null;
  executionTime: number;
  organizationId: string;
  testing?: boolean;
  resultStatuses: Partial<Record<DecisionRunResult, number>>;
  createdAt: Date;
  createdBy?: UserBasic | null;
}

export enum DecisionsSortField {
  Date = 'date',
  Source = 'source',
  DecisionName = 'name',
  StrategyName = 'strategyName',
  ExecutionTime = 'executionTime',
  Result = 'passed',
}

export interface FindDecisionsParams extends PaginationParams<DecisionsSortField>{
  source?: ExecutionSource;
  teamMembersIds?: string[];
  strategyId?: string;
  resultStatuses?: DecisionRunResult[];
  createdAtFrom?: string;
  createdAtTo?: string;
  applicationId?: string;
}

class DecisionsApi extends BaseSystemApi<Decision, FindDecisionsParams>{
  protected path = '/decisions';

  constructor(protected apiClient: IApiClient) {
    super(apiClient);
  }

  public find(params: FindDecisionsParams): Promise<PaginationResult<Decision>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall<PaginationResult<Decision>>(
      `${this.path}?${urlSearchParams}`,
    );
  }
}

export default DecisionsApi;
