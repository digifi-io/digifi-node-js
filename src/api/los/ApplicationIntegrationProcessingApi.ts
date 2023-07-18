import { IApiClient } from '../../clients';
import { VariableValue } from '../../types';
import { ExternalIntegrationResultType } from '../../enums';

export interface ProcessApplicationIntegrationParams {
  applicationId: string;
  integrationId: string;
}

export interface ExternalIntegrationProcessingResult {
  id: string;
  integrationId: string;
  integrationName: string;
  outputs: Record<string, VariableValue>;
  result: ExternalIntegrationResultType;
  status: number;
  userId?: string;
  applicationId?: string;
  applicationName?: string;
  raw?: string;
  error?: string;
}

class ApplicationIntegrationProcessingApi {
  protected path = '/application-integration-processing';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public processIntegration(params: ProcessApplicationIntegrationParams): Promise<ExternalIntegrationProcessingResult> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', params);
  }
}

export default ApplicationIntegrationProcessingApi;
