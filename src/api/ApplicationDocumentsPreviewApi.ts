import { IApiClient } from '../clients';

export interface ApplicationDocumentsPreviewApi {
  createToken(documentId: string): Promise<{ token: string }>;
}

export class ApplicationDocumentsPreviewRestApi implements ApplicationDocumentsPreviewApi {
  protected path = '/application-documents-preview';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public createToken(documentId: string): Promise<{ token: string }> {
    return this.apiClient.makeCall(`${this.path}/${documentId}`);
  }
}
