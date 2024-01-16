import { IApiClient, RequestBody } from '../clients';
import ApiVersion from '../enums/ApiVersion';
import { BaseSystemApi } from './BaseSystemApi';

export abstract class SystemApi<
  Resource,
  CreateParams = undefined,
  UpdateParams = undefined,
  FindParams = undefined,
  ListParams = undefined
> extends BaseSystemApi<Resource, FindParams, ListParams> {
  protected apiVersion?: ApiVersion;

  constructor(
    protected apiClient: IApiClient,
  ) {
    super(apiClient);
    this.apiVersion = apiClient.apiVersion;
  }

  public create(params: CreateParams): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}`, 'POST', params as RequestBody);
  }

  public update(id: string, params: UpdateParams): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}/${id}`, 'PUT', params as RequestBody);
  }
}
