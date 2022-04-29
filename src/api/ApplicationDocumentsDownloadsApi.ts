import { ApplicationDocumentsDownloadsApiClient } from '../ApplicationDocumentsDownloadsApiClient';

const FILENAME_FROM_HEADER_PATTERN = /filename="([^"]+)"/;

export interface DownloadResponse {
  file: ArrayBuffer;
  filename: string;
}

export default class ApplicationDocumentsDownloadsApi {
  protected basePath = 'application-documents-downloads';

  constructor(protected apiClient: ApplicationDocumentsDownloadsApiClient) {}

  public async findById(id: string): Promise<DownloadResponse> {
    const response = await this.apiClient.makeCall<Response>(`/${this.basePath}/${id}`);
    const [, filename] = response.headers.get('content-disposition')?.match(FILENAME_FROM_HEADER_PATTERN) || [];

    return { file: await response.arrayBuffer(), filename };
  }

  public async find(applicationId: string): Promise<DownloadResponse> {
    const params = new URLSearchParams();
    params.append('applicationId', applicationId);

    const response = await this.apiClient.makeCall<Response>(`/${this.basePath}?${params}`);
    const [, filename] = response.headers.get('content-disposition')?.match(FILENAME_FROM_HEADER_PATTERN) || [];

    return { file: await response.arrayBuffer(), filename };
  }
}
