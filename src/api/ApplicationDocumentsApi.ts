import { IApiClient } from '../clients';
import FormData from 'form-data';
import { UserShort } from '../types';
import { BaseSystemApi } from './base';

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
  /**
   * @deprecated Use taskIds instead
   */
  taskId?: string;
  taskIds?: string[];
  labelIds: string[];
  testing?: boolean;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  createdAt: Date;
  updatedAt: Date;
  applicationId: string;
  duplicatedFrom?: string;
  accessPermissions: ApplicationDocumentAccessPermission[] | null;
}

export interface ApplicationDocumentFileUploadParams {
  file: Buffer;
  fileName: string;
  parentId?: string | null;
  anchor?: string | null;
  labelIds?: string[];
}

export interface CreateApplicationDocumentParams extends ApplicationDocumentFileUploadParams {
  applicationId: string;
  taskId?: string;
  accessPermissions?: ApplicationDocumentAccessPermission[];
  labelIds?: string[];
}

export interface CreateManyApplicationDocumentParams {
  files: ApplicationDocumentFileUploadParams[];
  accessPermissions?: ApplicationDocumentAccessPermission[];
  taskId?: string;
}

export interface FindApplicationDocumentsParams {
  applicationId: string;
  /**
   * @deprecated Use taskIds instead
   */
  taskId?: string;
  taskIds?: string[];
  accessPermissionEntityType?: ApplicationDocumentAccessPermissionEntityType;
  accessPermissionEntityId?: string;
}

export type UpdateApplicationDocumentLabelsParams = {
  set: string[];
} | {
  add?: string[];
  remove?: string[];
}

export interface UpdateApplicationDocumentParams {
  name?: string;
  parentId?: string;
  accessPermissions?: ApplicationDocumentAccessPermission[];
  labels?: UpdateApplicationDocumentLabelsParams;
}

export interface CreateApplicationDocumentFolderParams {
  applicationId: string;
  name: string;
  parentId?: string | null;
}

export interface ApplicationDocumentTasksLinkParams {
  applicationId: string;
  documentIds: string[];
  taskId: string;
}

export interface ApplicationDocumentTasksUnlinkParams {
  applicationId: string;
  documentIds: string[];
  taskId: string;
}

export interface ApplicationDocumentsApi {
  find(params: FindApplicationDocumentsParams): Promise<ApplicationDocument[]>;
  findById(id: string): Promise<ApplicationDocument>;
  create(params: CreateApplicationDocumentParams): Promise<ApplicationDocument>;
  createMany(applicationId: string, params: CreateManyApplicationDocumentParams): Promise<void>;
  createFolder(params: CreateApplicationDocumentFolderParams): Promise<ApplicationDocument>;
  update(id: string, params: UpdateApplicationDocumentParams): Promise<ApplicationDocument>;
  delete(id: string): Promise<ApplicationDocument>;
  tasksLink(params: ApplicationDocumentTasksLinkParams): Promise<void>;
  tasksUnlink(params: ApplicationDocumentTasksUnlinkParams): Promise<void>;
}

export class ApplicationDocumentsRestApi
  extends BaseSystemApi<ApplicationDocument, FindApplicationDocumentsParams>
  implements ApplicationDocumentsApi
{
  protected path = '/application-documents';

  constructor(protected apiClient: IApiClient) {
    super(apiClient);
  }

  public async find(params: FindApplicationDocumentsParams): Promise<ApplicationDocument[]> {
    const applicationDocuments = await super.find(params);

    return applicationDocuments as ApplicationDocument[];
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

    if (params.labelIds) {
      formData.append('labelIds', JSON.stringify(params.labelIds));
    }

    return this.apiClient.makeCall<ApplicationDocument>(`${this.path}`, 'POST', formData, { contentType: null });
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

      if (batchUploadDocumentParams.labelIds) {
        batchUploadDocumentParams.labelIds.forEach((labelId) => {
          formData.append(`options[${index}].labelIds`, labelId);
        });
      }
    });

    formData.append('applicationId', applicationId);

    if (params.taskId) {
      formData.append('taskId', params.taskId);
    }

    if (params.accessPermissions) {
      formData.append('accessPermissions', JSON.stringify(params.accessPermissions));
    }

    return this.apiClient.makeCall(`${this.path}/batch`, 'POST', formData, {
      contentType: null,
    });
  }

  public update(id: string, params: UpdateApplicationDocumentParams): Promise<ApplicationDocument> {
    return this.apiClient.makeCall<ApplicationDocument>(`${this.path}/${id}`, 'PUT', params);
  }

  public createFolder(params: CreateApplicationDocumentFolderParams): Promise<ApplicationDocument> {
    return this.apiClient.makeCall<ApplicationDocument>(`${this.path}/document-folders`, 'POST', {
      ...params,
      parentId: params.parentId || null,
    });
  }

  public tasksLink({ documentIds, ...params }: ApplicationDocumentTasksLinkParams): Promise<void> {
    return this.apiClient.makeCall<void>(`${this.path}/tasks-link`, 'PUT', {
      ...params,
      ids: documentIds,
    });
  }

  public tasksUnlink({ documentIds, ...params }: ApplicationDocumentTasksUnlinkParams): Promise<void> {
    return this.apiClient.makeCall<void>(`${this.path}/tasks-unlink`, 'PUT', {
      ...params,
      ids: documentIds,
    });
  }
}
