import { DocumentsDownloadsApiClient } from '../../clients';

export interface IntegrationDocumentDownloadResponse {
  file: ArrayBuffer;
  filename: string;
}

class IntegrationFileDownloadApi {
  private fileNameFromHeadersPattern = /filename="([^"]+)"/;

  protected path = '/integration-file-download';

  constructor(
    protected apiClient: DocumentsDownloadsApiClient,
  ) {}

  public async findById(id: string): Promise<IntegrationDocumentDownloadResponse> {
    const response = await this.apiClient.makeCall<Response>(`/${this.path}/${id}`);

    const [, filename] = response.headers.get('content-disposition')?.match(this.fileNameFromHeadersPattern) || [];

    return { file: await response.arrayBuffer(), filename };
  }
}

export default IntegrationFileDownloadApi;
