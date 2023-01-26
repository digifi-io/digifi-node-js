import { UserBasic } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import FormData from 'form-data';

export interface CompactIntegrationFile {
  id: string;
  name: string;
  fileType: string;
  integrationResultId: string;
  testing?: boolean;
  integrationId?: string;
  fileSize?: number;
  organizationId: string;
  createdBy?: UserBasic | null;
}

export enum IntegrationFilePermissionSection {
  IntegrationRequestFiles = 'integrationRequestFiles',
  IntegrationResponseFiles = 'integrationResponseFiles',
  IntegrationUserFiles = 'integrationUserFiles',
}

export interface IntegrationFile extends CompactIntegrationFile {
  fileUrl: string;
  permissionSection: IntegrationFilePermissionSection;
}

export interface IntegrationResultFileParams {
  fileName: string;
  file: Buffer;
}

class IntegrationResultFilesApi {
  protected path = '/integration-result-files';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public uploadMany(integrationResultId: string, files: IntegrationResultFileParams[]): Promise<IntegrationFile[]> {
    const formData = new FormData();

    files.forEach((batchUploadDocumentParams, index) => {
      formData.append('files', batchUploadDocumentParams.file, batchUploadDocumentParams.fileName);
    });

    formData.append('integrationResultId', integrationResultId);

    return this.apiClient.makeCall<IntegrationFile[]>(this.path, 'POST', formData, {
      contentType: null,
    });
  }
}

export default IntegrationResultFilesApi;
