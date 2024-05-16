import { IApiClient } from '../clients';
import { VariableValue } from '../types';
import { ExternalIntegrationResultType } from '../enums';

export interface ProcessApplicationIntegrationParams {
  applicationId: string;
  integrationId: string;
  returnRawResponse?: boolean;
}

export interface ExternalIntegrationProcessingResult {
  resultId: string;
  integrationId: string;
  integrationName: string;
  outputs: Record<string, VariableValue>;
  result: ExternalIntegrationResultType;
  statusCode: number;
  applicationId?: string;
  applicationDisplayId?: string;
  applicationName?: string;
  rawResponse?: string;
  error?: string;
}

export interface ApplicationIntegrationProcessingApi {
  processIntegration(params: ProcessApplicationIntegrationParams): Promise<ExternalIntegrationProcessingResult>;
}

export class ApplicationIntegrationProcessingRestApi implements ApplicationIntegrationProcessingApi {
  protected path = '/application-integration-processing';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public processIntegration(params: ProcessApplicationIntegrationParams): Promise<ExternalIntegrationProcessingResult> {
    return this.apiClient.makeCall(this.path, 'POST', params);
  }
}
