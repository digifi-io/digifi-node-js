import { UserBasic, VariableValue } from '../../types';
import { DecisionRunResult } from '../../enums';
import { IApiClient } from '../../clients';

export interface ProcessDecisionsParams {
  decisionName?: string;
  applicationId?: string;
  decisionClientId?: string;
  ignoreUndefined?: boolean;
  returnOnlyPassed?: boolean;
  commonInputs?: Record<string, VariableValue>;
  decisions: Array<{
    strategyId: string;
    inputs: Record<string, VariableValue>;
  }>;
  strict?: boolean;
}

export enum StrategyModuleType {
  Requirements = 'requirements',
  Formula = 'formula',
  Score = 'score',
  DataIntegration = 'dataIntegration',
  Decision = 'decision',
}

export interface DecisionResultCompiledModuleInfo {
  id: string;
  type: StrategyModuleType;
  name: string;
}

export interface BaseModuleProcessingResult {
  moduleId: string;
  name: string;
  passed: boolean;
  skipped?: boolean;
}

export interface RequirementsModuleProcessingResult extends BaseModuleProcessingResult {
  type: StrategyModuleType.Requirements;
}

export interface FormulaModuleProcessingResult extends BaseModuleProcessingResult {
  type: StrategyModuleType.Formula;
}

export interface ScoreModuleProcessingResult extends BaseModuleProcessingResult {
  type: StrategyModuleType.Score;
}

export interface DataIntegrationModuleProcessingResult extends BaseModuleProcessingResult {
  type: StrategyModuleType.DataIntegration;
  integrationId?: string;
  integrationProcessingResultId?: string;
  status?: string;
}

export interface DecisionModuleProcessingResult extends BaseModuleProcessingResult {
  type: StrategyModuleType.Decision;
  declineReasons?: string[];
}

export type StrategyModuleProcessingResult =
  | RequirementsModuleProcessingResult
  | FormulaModuleProcessingResult
  | ScoreModuleProcessingResult
  | DataIntegrationModuleProcessingResult
  | DecisionModuleProcessingResult;

export interface DecisionResult {
  id: string;
  name: string;
  resultType: DecisionRunResult;
  strategyId: string;
  decision: string;
  strategyName: string;
  organizationId: string;
  modules: DecisionResultCompiledModuleInfo[];
  modulesProcessingResults: StrategyModuleProcessingResult[];
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

export interface RunDecisionsResponse {
  decisionId: string;
  decisionName: string;
  resultsCount: number;
  statusCode: number;
  statusMessage: string;
  decisionClientId?: string;
  applicationId?: string;
  requestDate: Date;
  responseDate: Date;
  results?: DecisionResult[];
}

class DecisionProcessingApi {
  protected path = '/decision-processing';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public async runDecisions(options: ProcessDecisionsParams): Promise<RunDecisionsResponse> {
    return this.apiClient.makeCall<RunDecisionsResponse>(
      this.path,
      'POST',
      options,
    );
  }
}

export default DecisionProcessingApi;
