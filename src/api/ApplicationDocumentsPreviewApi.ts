import { AuthorizedApiClient } from '../AuthorizedApiClient';

class ApplicationDocumentsPreviewApi {
  protected path = '/application-documents-preview';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public createToken(documentId: string): Promise<{ token: string }> {
    return this.apiClient.makeCall(`${this.path}/${documentId}`);
  }
}

export default ApplicationDocumentsPreviewApi;
