import { AuthorizedApiClient } from '../../clients';
import { DecisionRunResult } from '../../enums';
import { UserBasic, VariableValue } from '../../types';

export interface MakeDecisionParams {
  strategyId: string;
  applicationId: string;
  decisionName?: string;
  successStatusId?: string;
  failureStatusId?: string;
}

export interface ApplicationDecisionResult {
  id: string;
  name: string;
  resultType: DecisionRunResult;
  strategyId: string;
  decisionId: string;
  strategyName: string;
  organizationId: string;
  inputs: Record<string, VariableValue>;
  outputs: Record<string, VariableValue>;
  passed: boolean;
  errorMessages: string[];
  declineReasons: string[];
  executionTime: number;
  testing?: boolean;
  createdAt: Date;
  createdBy?: UserBasic | null;
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
  result: ApplicationDecisionResult;
  runBy?: string | null;
}

class ApplicationDecisionProcessingApi {
  protected path = '/application-decision-processing';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public makeDecision(params: MakeDecisionParams): Promise<ApplicationDecision> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', params);
  }
}

export default ApplicationDecisionProcessingApi;
