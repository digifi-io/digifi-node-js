import { IApiClient } from '../../clients';
import { DownloadApi, DownloadResponse } from '../base';
import { ApplicationDocumentAccessPermission } from './ApplicationDocumentsApi';

export default class ApplicationDocumentsDownloadsApi extends DownloadApi {
  protected path = 'application-documents-downloads';

  constructor(apiClient: IApiClient) {
    super(apiClient);
  }

  public async downloadById(id: string): Promise<DownloadResponse> {
    return this.download(`/${this.path}/${id}`);
  }

  public async downloadAll(applicationId: string, accessPermission?: ApplicationDocumentAccessPermission): Promise<DownloadResponse> {
    const params = new URLSearchParams();

    params.append('applicationId', applicationId);
    accessPermission?.entityId && params.append('accessPermissionEntityId', accessPermission.entityId);
    accessPermission?.entityType && params.append('accessPermissionEntityType', accessPermission.entityType);

    return this.download(`/${this.path}?${params}`)
  }
}
