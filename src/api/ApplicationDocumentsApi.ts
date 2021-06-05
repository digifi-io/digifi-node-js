import ApiClient from '../ApiClient';
import { UserShortInfo } from '../types';

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
}

export default class ApplicationDocumentsApi {
  protected basePath = 'application-documents';

  protected constructor(
    protected apiClient: ApiClient,
  ) {}

  public getAll(): Promise<ApplicationDocument[]> {
    return this.apiClient.makeCall<ApplicationDocument[]>(`/${this.basePath}`);
  }

  public getById(id: string): Promise<Buffer> {
    return this.apiClient.makeCall<Buffer>(`/${this.basePath}/${id}`);
  }

  public delete(id: string): Promise<ApplicationDocument> {
    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}/${id}`, 'DELETE');
  }

  public create(body: CreateApplicationDocumentParams): Promise<ApplicationDocument> {
    return this.apiClient.makeCall<ApplicationDocument>(`/${this.basePath}`, 'POST', body as unknown as Record<string, unknown>);
  }
}

