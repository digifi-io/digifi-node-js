import { ApiClient } from '../ApiClient';
import { VariableValue } from '../types';
import { StrategyStatus } from '../enums';

export interface RunDecisionParams {
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
  declineReasons: string[],
  inputVariables: Record<string, VariableValue>;
  outputVariables: Record<string, VariableValue>;
}

export interface RunDecisionResult {
  decisionId: string;
  decisionClientId?: string;
  resultsCount: number;
  applicationId?: string;
  executionTime: number;
  results: Array<IStrategyProcessingResult>;
}

export default class DecisionEngineApi {
  constructor(
    private apiClient: ApiClient,
  ) {}

  public async runDecision(options: RunDecisionParams): Promise<RunDecisionResult> {
    return this.apiClient.makeCall<RunDecisionResult>(
      '/decision-processing',
      'POST',
      options,
    );
  }
}
