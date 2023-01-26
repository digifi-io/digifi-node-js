import { UserBasic } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import FormData from 'form-data';

export interface FileCompact {
  id: string;
  name: string;
  fileType: string;
  integrationResultId: string;
  integrationId: string;
  fileSize?: number;
  createdBy?: UserBasic;
}

export interface IntegrationResultFileParams {
  fileName: string;
  file: Buffer;
}

class IntegrationResultFilesApi {
  protected basePath = '/integration-result-files';

  constructor(protected apiClient: AuthorizedApiClient) {}

  public create(integrationResultId: string, files: IntegrationResultFileParams[]): Promise<FileCompact[]> {
    const formData = new FormData();

    files.forEach((batchUploadDocumentParams, index) => {
      formData.append('files', batchUploadDocumentParams.file, batchUploadDocumentParams.fileName);
    });

    formData.append('integrationResultId', integrationResultId);

    return this.apiClient.makeCall<FileCompact[]>(this.basePath, 'POST', formData, {
      contentType: null,
    });
  }
}

export default IntegrationResultFilesApi;
