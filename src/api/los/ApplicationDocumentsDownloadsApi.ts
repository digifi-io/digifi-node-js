import { IApiClient } from '../../clients';
import { DownloadApi, DownloadResponse } from '../base';

export default class ApplicationDocumentsDownloadsApi extends DownloadApi {
  protected path = 'application-documents-downloads';

  constructor(apiClient: IApiClient) {
    super(apiClient);
  }

  public async downloadById(id: string): Promise<DownloadResponse> {
    return this.download(`/${this.path}/${id}`);
  }

  public async downloadAll(applicationId: string): Promise<DownloadResponse> {
    const params = new URLSearchParams();

    params.append('applicationId', applicationId);

    return this.download(`/${this.path}?${params}`)
  }
}
