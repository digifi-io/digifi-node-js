import DecisionEngineApiClient from '../DecisionEngineApiClient';

export enum StrategyStatus {
  Active = 'active',
  Testing = 'testing',
}

interface ProcessingDetail {
  name: string;
  passed: boolean;
  decline_reasons: string[];
}

interface ResponseDataSource {
  name: string;
  provider: string;
  data?: string | null;
}

export interface DataSource extends ResponseDataSource {
  name: string;
  provider: string;
  data: string;
  contentType: string;
}

export interface RunStrategyResponse<OutputVariable> {
  results: {
    passed: boolean;
    decline_reasons: string[];
    processing_detail: Array<ProcessingDetail>;
    output_variables: OutputVariable;
    data_sources: Array<ResponseDataSource>;
    case_id: string;
    input_variables?: VariablesType;
  };
}

interface RunBatchStrategyResponse {
  strategy_name: string;
  strategy_status: string;
  case_id: string;
  passed: boolean;
  decline_reasons: string[];
  input_variables?: VariablesType;
  output_variables: VariablesType;
}

export interface RunBatchStrategiesResponse {
  batch_id: string;
  results: Array<RunBatchStrategyResponse>;
}

export interface RunStrategyOptions {
  strategyName: string;
  caseName: string;
  applicationId?: string;
  variables: VariablesType;
  status?: StrategyStatus;
  returnInputVariables?: boolean;
}

interface RunBatchStrategyOptions {
  strategyName: string;
  strategyStatus: StrategyStatus;
  variables: VariablesType;
}

export interface RunBatchStrategiesOptions {
  applicationId?: string;
  returnOnlyPasses?: boolean;
  returnInputVariables?: boolean;
  globalVariables: VariablesType;
  strategies: RunBatchStrategyOptions[];
}

export type VariablesType = Record<string, boolean | number | Date | string | null>;

export enum DataSourceContentType {
  Json = 'json',
  Xml = 'xml',
}

export default class DecisionEngineApi {
  private readonly defaultStrategyStatus: StrategyStatus;

  constructor(
    private apiClient: DecisionEngineApiClient,
    defaultStrategyStatus?: StrategyStatus,
  ) {
    this.defaultStrategyStatus = defaultStrategyStatus || StrategyStatus.Testing;
  }

  public async runStrategy<OutputVariable = VariablesType>(options: RunStrategyOptions) {
    const { strategyName, applicationId, status = this.defaultStrategyStatus, variables, caseName, returnInputVariables } = options;

    const { results } = await this.apiClient.makeCall<RunStrategyResponse<OutputVariable>>('/ml_rules_engine', 'POST', {
      strategy_name: strategyName,
      case_name: caseName,
      strategy_status: status,
      application_id: applicationId,
      return_data_sources: true,
      return_processing_detail: true,
      variables,
      return_input_variables: returnInputVariables,
    });

    return {
      caseId: results.case_id,
      passed: results.passed,
      outputVariables: results.output_variables,
      declineReasons: results.decline_reasons,
      processingDetails: results.processing_detail,
      processingResults: results.processing_detail ? this.getProcessingCheckResults(results.processing_detail) : {},
      dataSources: results.data_sources ? this.getTransformedDataSources(results.data_sources) : [],
      inputVariables: results.input_variables || {},
    };
  }

  public async runBatchStrategies(options: RunBatchStrategiesOptions) {
    const { applicationId, strategies, returnOnlyPasses, globalVariables, returnInputVariables } = options;

    const variables = strategies.map((strategyOptions) => ({
      strategy_name: strategyOptions.strategyName,
      strategy_status: strategyOptions.strategyStatus,
      ...strategyOptions.variables,
    }));

    const { results, batch_id } = await this.apiClient.makeCall<RunBatchStrategiesResponse>('/rules_engine_batch', 'POST', {
      application_id: applicationId,
      globals_variables: globalVariables,
      return_only_passes: returnOnlyPasses,
      return_input_variables: returnInputVariables,
      variables,
    });

    return {
      batchId: batch_id,
      results: results.map((runStrategyResults) => ({
        caseId: runStrategyResults.case_id,
        strategyName: runStrategyResults.strategy_name,
        strategyStatus: runStrategyResults.strategy_status,
        passed: runStrategyResults.passed,
        declineReasons: runStrategyResults.decline_reasons,
        inputVariables: runStrategyResults.input_variables || {},
        outputVariables: runStrategyResults.output_variables,
      })),
    }
  }

  private getProcessingCheckResults(processingDetails: Array<ProcessingDetail>): Record<string, boolean> {
    return processingDetails.reduce((acc: Record<string, boolean>, processingDetail) => {
      acc[processingDetail.name] = processingDetail.passed;

      return acc;
    }, {});
  }

  private getTransformedDataSources = (dataSources: ResponseDataSource[]): Array<DataSource> => {
    return dataSources.map((dataSource) => ({
      ...dataSource,
      data: dataSource.data ? dataSource.data : '',
      contentType: dataSource.data ? this.getDataSourceContentType(dataSource.data) : DataSourceContentType.Xml,
    }));
  }

  private getDataSourceContentType(content: string) {
    try {
      JSON.parse(content);

      return DataSourceContentType.Json;
    } catch {
      return DataSourceContentType.Xml;
    }
  }
}
