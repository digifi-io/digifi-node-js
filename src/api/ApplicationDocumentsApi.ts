import ApiClient from '../ApiClient';
import FormData from 'form-data';
import { TableData, UserShortInfo } from '../types';

export interface ApplicationDocument {
  id: string;
  name: string;
  extension: string;
  size: number;
  createdBy?: UserShortInfo | null;
  createdAt: Date;
  applicationId: string;
}

export interface CreateApplicationDocumentParams {
  applicationId: string;
  file: Buffer;
  fileName: string;
}

export default class ApplicationDocumentsApi {
  protected basePath = 'application-documents';

  constructor(protected apiClient: ApiClient) {}

  public find(): Promise<TableData<ApplicationDocument>> {
    return this.apiClient.makeCall<TableData<ApplicationDocument>>(`/${this.basePath}`);
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
    formData.append('file', params.file, params.fileName)
    formData.append('document.name', params.fileName);

    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}`, 'POST', formData, { contentType: null });
  }
}

