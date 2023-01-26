import { PaginationParams, PaginationResult, UserBasic } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import { BaseSystemApi, SearchParams } from '../BaseSystemApi';
import { DecisionRunResult, ExecutionSource } from '../../enums';
import getSearchParams from '../../utils/getSearchParams';

export interface Decision {
  id: string;
  name: string;
  source: ExecutionSource;
  strategyNames: string[];
  strategies: string[];
  resultsCount: number;
  applicationId: string | null;
  applicationDisplayId: string | null;
  applicationName: string | null;
  executionTime: number;
  organization: string;
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
  teamMemberIds?: string[];
  strategy?: string;
  resultStatuses?: DecisionRunResult[];
  createdAtFrom?: string;
  createdAtTo?: string;
  applicationId?: string;
}

class DecisionsApi extends BaseSystemApi<Decision, FindDecisionsParams>{
  protected basePath = '/decisions';

  constructor(protected apiClient: AuthorizedApiClient) {
    super(apiClient);
  }

  public find(params: FindDecisionsParams): Promise<PaginationResult<Decision>> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    if (params.teamMemberIds) {
      params.teamMemberIds.forEach((teamMemberId) => urlSearchParams.append('team-member-ids', teamMemberId));
    }

    if (params.resultStatuses) {
      params.resultStatuses.forEach((resultStatus) => urlSearchParams.append('result-statuses', resultStatus));
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

    return this.apiClient.makeCall<PaginationResult<Decision>>(
      `${this.basePath}?${urlSearchParams}`,
    );
  }
}

export default DecisionsApi;
