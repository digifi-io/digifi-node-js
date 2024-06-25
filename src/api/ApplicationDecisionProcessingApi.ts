import { IApiClient } from '../clients';
import { DecisionResult } from './DecisionProcessingApi';

export interface MakeDecisionParams {
  strategyId: string;
  applicationId: string;
  decisionName?: string;
  successStatusId?: string;
  failureStatusId?: string;
}

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
  result: DecisionResult;
  runBy?: string | null;
}

export interface ApplicationDecisionProcessingApi {
  makeDecision(params: MakeDecisionParams): Promise<ApplicationDecision>;
}

export class ApplicationDecisionProcessingRestApi implements ApplicationDecisionProcessingApi {
  protected path = '/application-decision-processing';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public makeDecision(params: MakeDecisionParams): Promise<ApplicationDecision> {
    return this.apiClient.makeCall(this.path, 'POST', params);
  }
}
