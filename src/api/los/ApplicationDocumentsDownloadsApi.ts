import { DocumentsDownloadsApiClient } from '../../clients';

export interface DownloadResponse {
  file: ArrayBuffer;
  filename: string;
}

export default class ApplicationDocumentsDownloadsApi {
  protected fileNameFromHeadersPattern = /filename="([^"]+)"/;
  protected path = 'application-documents-downloads';

  constructor(protected apiClient: DocumentsDownloadsApiClient) {}

  public async findById(id: string): Promise<DownloadResponse> {
    const response = await this.apiClient.makeCall<Response>(`/${this.path}/${id}`);

    const [, filename] = response.headers.get('content-disposition')?.match(this.fileNameFromHeadersPattern) || [];

    return { file: await response.arrayBuffer(), filename };
  }

  public async find(applicationId: string): Promise<DownloadResponse> {
    const params = new URLSearchParams();

    params.append('applicationId', applicationId);

    const response = await this.apiClient.makeCall<Response>(`/${this.path}?${params}`);

    const [, filename] = response.headers.get('content-disposition')?.match(this.fileNameFromHeadersPattern) || [];

    return { file: await response.arrayBuffer(), filename };
  }
}
