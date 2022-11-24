import { DocumentsDownloadsApiClient } from '../../clients';

class IntegrationFileDownloadApi {
  protected basePath = '/integration-file-download';

  constructor(protected apiClient: DocumentsDownloadsApiClient) {}

  public async findById(id: string): Promise<ArrayBuffer> {
    const response = await this.apiClient.makeCall<Response>(`/${this.basePath}/${id}`);

    return await response.arrayBuffer();
  }
}

export default IntegrationFileDownloadApi;
