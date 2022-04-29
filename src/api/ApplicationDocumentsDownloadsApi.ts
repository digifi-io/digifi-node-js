import { ApplicationDocumentsDownloadsApiClient } from '../ApplicationDocumentsDownloadsApiClient';

export default class ApplicationDocumentsDownloadsApi {
  protected basePath = 'application-documents-downloads';

  constructor(protected apiClient: ApplicationDocumentsDownloadsApiClient) {}

  public async findById(id: string): Promise<ArrayBuffer> {
    return this.apiClient.makeCall(`/${this.basePath}/${id}`);
  }

  public find(applicationId: string): Promise<ArrayBuffer> {
    const params = new URLSearchParams();
    params.append('applicationId', applicationId);

    return this.apiClient.makeCall(`/${this.basePath}?${params}`);
  }
}
