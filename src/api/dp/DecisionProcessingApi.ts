import { VariableValue } from '../../types';
import { StrategyStatus } from '../../enums';
import { AuthorizedApiClient } from '../../clients';

export interface ProcessDecisionParams {
  decisionClientId?: string;
  applicationId?: string;
  decisionName?: string;
  decisions: Array<{
    strategyName: string;
    strategyStatus: StrategyStatus;
    inputs: Record<string, VariableValue>;
  }>;
  commonInputs?: Record<string, VariableValue>;
  returnOnlyPassed?: false;
  ignoreUndefined?: boolean;
}

export interface IStrategyProcessingResult {
  strategyName: string;
  strategyVersion: number;
  strategyStatus: StrategyStatus;
  passed: boolean;
  errors?: string[];
  declineReasons: string[];
  inputVariables: Record<string, VariableValue>;
  outputVariables: Record<string, VariableValue>;
}

export interface DecisionProcessResult {
  decisionId: string;
  decisionClientId?: string;
  resultsCount: number;
  applicationId?: string;
  executionTime: number;
  results: Array<IStrategyProcessingResult>;
}

class DecisionProcessingApi {
  protected basePath = '/decision-processing';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public async runDecision(options: ProcessDecisionParams): Promise<DecisionProcessResult> {
    return this.apiClient.makeCall<DecisionProcessResult>(
      this.basePath,
      'POST',
      options,
    );
  }
}

export default DecisionProcessingApi;
