import { IApiClient } from '../ApiClient';
import FormData from 'form-data';
import { TableData, UserShortInfo } from '../types';

export enum ApplicationDocumentType {
  File = 'file',
  Folder = 'folder',
}

export enum ApplicationDocumentAccessPermissionEntityType {
  Borrower = 'borrower',
  Intermediary = 'intermediary',
}

export interface ApplicationDocumentAccessPermission {
  entityId: string;
  entityType: ApplicationDocumentAccessPermissionEntityType;
  accessGranted: boolean;
}

export interface ApplicationDocument {
  id: string;
  type: ApplicationDocumentType;
  parentId: string | null;
  organizationId: string;
  configurationAnchor?: string | null;
  name: string;
  extension: string | null;
  size: number | null;
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
  createdAt: Date;
  updatedAt: Date;
  applicationId: string;
  accessPermissions: ApplicationDocumentAccessPermission[] | null;
}

export interface ApplicationDocumentFileUploadParams {
  file: Buffer;
  fileName: string;
  parentId?: string | null;
  anchor?: string | null;
}

export interface CreateApplicationDocumentParams extends ApplicationDocumentFileUploadParams {
  applicationId: string;
  taskId?: string;
  accessPermissions?: ApplicationDocumentAccessPermission[];
}

export interface CreateManyApplicationDocumentParams {
  files: ApplicationDocumentFileUploadParams[];
  accessPermissions?: ApplicationDocumentAccessPermission[];
}

export interface FindApplicationDocumentsParams {
  applicationId: string;
  taskId?: string;
  accessPermissionEntityType?: ApplicationDocumentAccessPermissionEntityType;
  accessPermissionEntityId?: string;
}

export default class ApplicationDocumentsApi {
  protected basePath = 'application-documents';

  constructor(protected apiClient: IApiClient) {}

  public find(params: FindApplicationDocumentsParams): Promise<ApplicationDocument[]> {
    const urlParams = new URLSearchParams();
    urlParams.append('applicationId', params.applicationId);

    if (params.taskId) {
      urlParams.append('taskId', params.taskId);
    }

    if (params.accessPermissionEntityType) {
      urlParams.append('accessPermissionEntityType', params.accessPermissionEntityType);
    }

    if (params.accessPermissionEntityId) {
      urlParams.append('accessPermissionEntityId', params.accessPermissionEntityId);
    }

    return this.apiClient.makeCall<ApplicationDocument[]>(`/${this.basePath}?${urlParams}`);
  }

  public findById(id: string): Promise<ApplicationDocument> {
    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}/${id}`);
  }

  public delete(id: string): Promise<ApplicationDocument> {
    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}/${id}`, 'DELETE');
  }

  public create(params: CreateApplicationDocumentParams): Promise<ApplicationDocument> {
    const formData = new FormData();

    formData.append('applicationId', params.applicationId);
    formData.append('file', params.file, params.fileName);

    if (params.parentId) {
      formData.append('parentId', params.parentId);
    }

    if (params.anchor) {
      formData.append('anchor', params.anchor);
    }

    if (params.taskId) {
      formData.append('taskId', params.taskId);
    }

    if (params.accessPermissions) {
      formData.append('accessPermissions', JSON.stringify(params.accessPermissions));
    }

    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}`, 'POST', formData, { contentType: null });
  }

  public createMany(applicationId: string, params: CreateManyApplicationDocumentParams): Promise<void> {
    const formData = new FormData();

    params.files.forEach((batchUploadDocumentParams, index) => {
      formData.append('files', batchUploadDocumentParams.file, batchUploadDocumentParams.fileName);

      if (batchUploadDocumentParams.parentId) {
        formData.append(`options[${index}].parentId`, batchUploadDocumentParams.parentId);
      }

      if (batchUploadDocumentParams.anchor) {
        formData.append(`options[${index}].anchor`, batchUploadDocumentParams.anchor);
      }
    });

    formData.append('applicationId', applicationId);

    if (params.accessPermissions) {
      formData.append('accessPermissions', JSON.stringify(params.accessPermissions));
    }

    return this.apiClient.makeCall(`/${this.basePath}/batch`, 'POST', formData, {
      contentType: null,
    });
  }
}
