import { IApiClient } from '../ApiClient';
import FormData from 'form-data';
import { TableData, UserShortInfo } from '../types';

export enum ApplicationDocumentType {
  File = 'file',
  Folder = 'folder',
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
}

export interface CreateApplicationDocumentParams {
  applicationId: string;
  file: Buffer;
  fileName: string;
  parentId?: string | null;
  anchor?: string | null;
  taskId?: string
}

export default class ApplicationDocumentsApi {
  protected basePath = 'application-documents';

  constructor(protected apiClient: IApiClient) {}

  public find(applicationId: string): Promise<TableData<ApplicationDocument>> {
    const urlParams = new URLSearchParams();
    urlParams.append('applicationId', applicationId);

    return this.apiClient.makeCall<TableData<ApplicationDocument>>(`/${this.basePath}?${urlParams}`);
  }

  public findById(id: string): Promise<Buffer> {
    return this.apiClient.makeCall<Buffer>(`/${this.basePath}/${id}`);
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

    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}`, 'POST', formData, { contentType: null });
  }
}

