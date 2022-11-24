import { VariableValue } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import { ExternalIntegrationResultType } from '../../enums';

export interface ProcessIntegrationParams {
  integrationId: string;
  inputs: Record<string, VariableValue>;
  applicationId?: string;
  returnRawResponse?: boolean;
}

export interface ProcessIntegrationResult {
  resultId: string;
  result: ExternalIntegrationResultType;
  integrationId: string;
  integrationName: string;
  applicationId?: string;
  applicationName?: string;
  error?: string;
  statusCode: number;
  outputs: Record<string, VariableValue>;
  rawResponse?: string;
}

class IntegrationProcessingApi {
  protected basePath = '/integration-processing';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public processIntegration(params: ProcessIntegrationParams): Promise<ProcessIntegrationResult> {
    return this.apiClient.makeCall<ProcessIntegrationResult>(
      `${this.basePath}`,
      'POST',
      params,
    );
  }
}

export default IntegrationProcessingApi;
