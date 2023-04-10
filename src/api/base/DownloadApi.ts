import { IApiClient } from '../../clients';
import { Headers } from 'node-fetch';

export interface DownloadResponse {
  file: ArrayBuffer;
  filename: string;
}

export default abstract class DownloadApi {
  private fileNameFromHeadersPattern = /filename="([^"]+)"/;

  protected constructor(
    private apiClient: IApiClient,
  ) {}

  protected async download(path: string): Promise<DownloadResponse> {
    const headers = new Headers();

    headers.set('responseType', 'arraybuffer');

    const response = await this.apiClient.makeCall<Response>(path, 'GET', undefined, { headers });

    const [, filename] = response.headers.get('content-disposition')?.match(this.fileNameFromHeadersPattern) || [];

    return { file: await response.arrayBuffer(), filename };
  }
}