import { VariableValue } from '../types';
import { IApiClient } from '../clients';
import { IntegrationResult } from '../data/models';

interface ProcessIntegrationFileParams {
  file: string;
  key: string;
}

export interface ProcessIntegrationParams {
  integrationId: string;
  inputs: Record<string, VariableValue>;
  applicationId?: string;
  returnRawResponse?: boolean;
  files: ProcessIntegrationFileParams[];
}

export interface UploadFileParams {
  file: File;
  identifier?: string;
}

export interface UploadFileResult {
  file: string;
  name: string;
  identifier?: string;
}

export interface IntegrationProcessingApi {
  processIntegration(params: ProcessIntegrationParams): Promise<IntegrationResult>;
  uploadFiles(params: UploadFileParams[]): Promise<UploadFileResult[]>;
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

  public uploadFiles(params: UploadFileParams[]) {
    const formData = new FormData();

    params.forEach(({
      file,
      identifier,
    }, index) => {
      formData.append('files', file);

      if (identifier) {
        formData.append(`identifier[${index}]`, identifier);
      }
    });

    return this.apiClient.makeCall<
      UploadFileResult[]
    >(`${this.path}/files`, 'POST', formData, {
      contentType: null,
    });
  }
}
