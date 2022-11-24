import { AuthorizedApiClient } from '../../clients';
import { StrategyStatus } from '../../enums';
import { VariableValue } from '../../types';

export interface FormattedResult {
  strategyName: string;
  strategyDisplayName: string;
  strategyVersion: number;
  strategyStatus: StrategyStatus;
  passed: boolean;
  errors: string[];
  declineReasons: string[];
  inputVariables: Record<string, VariableValue>;
  outputVariables: Record<string, VariableValue>;
}

export interface DecisionRunResponse {
  decisionId: string;
  decisionName: string;
  resultsCount: number;
  clientId: string;
  statusCode: number;
  statusMessage: string;
  requestDate: string;
  responseDate: string;
  executionTime: number;
  decisionClientId: string | null;
  strategyName: string;
  strategyVersion: number;
  strategyStatus: StrategyStatus;
  applicationId: string | null;
  results: FormattedResult[];
}

export interface MakeDecisionParams {
  strategyName: string;
  applicationId: string;
  decisionName?: string;
  successStatusId?: string;
  failureStatusId?: string;
}

class ApplicationDecisionProcessingApi {
  protected path = '/application-decision-processing';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public makeDecision(params: MakeDecisionParams): Promise<DecisionRunResponse> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', params);
  }
}

export default ApplicationDecisionProcessingApi;
