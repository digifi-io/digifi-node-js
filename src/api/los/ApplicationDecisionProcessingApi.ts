import { IApiClient } from '../../clients';
import { DecisionResult } from '../dp';

export interface MakeDecisionParams {
  strategyId: string;
  applicationId: string;
  decisionName?: string;
  successStatusId?: string;
  failureStatusId?: string;
}

/**
 * @deprecated Use DecisionResult interface instead.
 */
export type ApplicationDecisionResult = DecisionResult;

export interface ApplicationDecision {
  decisionId: string;
  decisionName: string;
  resultsCount: number;
  statusCode: number;
  statusMessage: string;
  decisionClientId?: string;
  applicationId: string;
  requestDate: Date;
  responseDate: Date;
  result: ApplicationDecisionResult;
  runBy?: string | null;
}

class ApplicationDecisionProcessingApi {
  protected path = '/application-decision-processing';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public makeDecision(params: MakeDecisionParams): Promise<ApplicationDecision> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', params);
  }
}

export default ApplicationDecisionProcessingApi;
