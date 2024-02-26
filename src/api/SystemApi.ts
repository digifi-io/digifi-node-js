import { IApiClient, RequestBody } from '../clients';
import { BaseSystemApi } from './BaseSystemApi';

export abstract class SystemApi<
  Resource,
  CreateParams = undefined,
  UpdateParams = undefined,
  FindParams = undefined,
  ListParams = undefined
> extends BaseSystemApi<Resource, FindParams, ListParams> {
  constructor(
    protected apiClient: IApiClient,
  ) {
    super(apiClient);
  }

  public create(params: CreateParams): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}`, 'POST', params as RequestBody);
  }

  public update(id: string, params: UpdateParams): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}/${id}`, 'PUT', params as RequestBody);
  }
}
