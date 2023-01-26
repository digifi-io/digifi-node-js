import { DocumentsDownloadsApiClient } from '../../clients';

const FILENAME_FROM_HEADER_PATTERN = /filename="([^"]+)"/;

export interface IntegrationDocumentDownloadResponse {
  file: ArrayBuffer;
  filename: string;
}

class IntegrationFileDownloadApi {
  protected basePath = '/integration-file-download';

  constructor(protected apiClient: DocumentsDownloadsApiClient) {}

  public async findById(id: string): Promise<IntegrationDocumentDownloadResponse> {
    const response = await this.apiClient.makeCall<Response>(`/${this.basePath}/${id}`);
    const [, filename] = response.headers.get('content-disposition')?.match(FILENAME_FROM_HEADER_PATTERN) || [];

    return { file: await response.arrayBuffer(), filename };
  }
}

export default IntegrationFileDownloadApi;
