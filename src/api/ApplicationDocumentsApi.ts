import { SystemApi } from './SystemApi';
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

export interface UpdateApplicationDocumentParams {
  name: string;
}

export default class ApplicationDocumentsApi extends SystemApi<ApplicationDocument, CreateApplicationDocumentParams, UpdateApplicationDocumentParams> {
  protected basePath = 'application-documents';

  public getById(id: string): Promise<any> {
    return super.getById(id);
  }
}
