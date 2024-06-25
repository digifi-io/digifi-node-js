import { VariableValue } from '../types';
import { IApiClient } from '../clients';
import { IntegrationResult } from '../data/models';

export interface ProcessIntegrationParams {
  integrationId: string;
  inputs: Record<string, VariableValue>;
  applicationId?: string;
  returnRawResponse?: boolean;
}

export interface IntegrationProcessingApi {
  processIntegration(params: ProcessIntegrationParams): Promise<IntegrationResult>;
}

export class IntegrationProcessingRestApi implements IntegrationProcessingApi {
  protected path = '/integration-processing';

  constructor(protected apiClient: IApiClient) {}

  public processIntegration(params: ProcessIntegrationParams): Promise<IntegrationResult> {
    return this.apiClient.makeCall<IntegrationResult>(
      this.path,
      'POST',
      params,
    );
  }
}
