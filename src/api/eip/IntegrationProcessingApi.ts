import { VariableValue } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import { IntegrationResult } from '../../data/models';

export interface ProcessIntegrationParams {
  integrationId: string;
  inputs: Record<string, VariableValue>;
  applicationId?: string;
  returnRawResponse?: boolean;
}

class IntegrationProcessingApi {
  protected basePath = '/integration-processing';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public processIntegration(params: ProcessIntegrationParams): Promise<IntegrationResult> {
    return this.apiClient.makeCall<IntegrationResult>(
      `${this.basePath}`,
      'POST',
      params,
    );
  }
}

export default IntegrationProcessingApi;
