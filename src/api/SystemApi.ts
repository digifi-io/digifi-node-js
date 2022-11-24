import { IApiClient, RequestBody } from '../clients';
import { BaseSystemApi } from './BaseSystemApi';

export abstract class SystemApi<Resource, CreateParams = undefined, UpdateParams = undefined, FindParams = undefined> extends BaseSystemApi<Resource, FindParams> {
  protected entityKey = '';

  constructor(
    protected apiClient: IApiClient,
  ) {
    super(apiClient);
  }

  public create(params: CreateParams): Promise<Resource> {
    const body = params && this.entityKey ? { [this.entityKey]: params } : params;

    return this.apiClient.makeCall<Resource>(`/${this.basePath}`, 'POST', body as RequestBody);
  }

  public update(id: string, params: UpdateParams): Promise<Resource> {
    const body = params && this.entityKey ? { [this.entityKey]: params } : params;

    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`, 'PUT', body as RequestBody);
  }
}
