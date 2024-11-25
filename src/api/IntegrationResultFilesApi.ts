import FormData from 'form-data';
import {PaginationParams, PaginationResult, UserBasic} from '../types';
import { IApiClient } from '../clients';
import getSearchParams from '../utils/getSearchParams';
import { SearchParams } from './base';

export enum IntegrationFilePermissionSection {
  IntegrationRequestFiles = 'integrationRequestFiles',
  IntegrationResponseFiles = 'integrationResponseFiles',
  IntegrationUserFiles = 'integrationUserFiles',
}

export enum IntegrationResultFileSortField {
  Name = 'name',
  FileType = 'fileType',
  FileSize = 'fileSize',
}

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

export interface IntegrationFile extends CompactIntegrationFile {
  fileUrl: string;
  permissionSection: IntegrationFilePermissionSection;
}

export interface IntegrationResultFileParams {
  fileName: string;
  file: Buffer;
}

export interface FindIntegrationResultFilesParams extends PaginationParams<IntegrationResultFileSortField>{
  integrationResultId?: string;
}

export interface IntegrationResultFilesApi {
  find(params: FindIntegrationResultFilesParams): Promise<PaginationResult<IntegrationFile>>;
  uploadMany(integrationResultId: string, files: IntegrationResultFileParams[]): Promise<IntegrationFile[]>;
}

export class IntegrationResultFilesRestApi implements IntegrationResultFilesApi {
  protected path = '/integration-result-files';

  constructor(protected apiClient: IApiClient) {}

  public async find(params: FindIntegrationResultFilesParams) {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall<PaginationResult<IntegrationFile>>(`${this.path}?${urlSearchParams}`);
  }

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
