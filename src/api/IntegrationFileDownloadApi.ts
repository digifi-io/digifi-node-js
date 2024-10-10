import { IApiClient } from '../clients';
import { DownloadApi, DownloadResponse } from './base';

export interface IntegrationFileDownloadApi {
  downloadById(id: string): Promise<DownloadResponse>;
}

export class IntegrationFileDownloadRestApi
  extends DownloadApi
  implements IntegrationFileDownloadApi
{
  protected path = '/integration-file-download';

  constructor(apiClient: IApiClient) {
    super(apiClient);
  }

  public async downloadById(id: string): Promise<DownloadResponse> {
    return this.download(`${this.path}/${id}`);
  }
}

export default IntegrationFileDownloadApi;
