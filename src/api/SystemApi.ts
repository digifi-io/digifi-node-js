import { IApiClient } from '../ApiClient';
import { TableData } from '../types';

export abstract class SystemApi<Resource, CreateParams = undefined, UpdateParams = undefined> {
  protected basePath = '';
  protected entityKey = '';

  constructor(
    protected apiClient: IApiClient,
  ) {}

  public find(params: Record<string, string | Array<string>> | Array<string[]> = {}): Promise<TableData<Resource>> {
    // TODO [Ilya] Rewrite
    let urlSearchParams = new URLSearchParams();

    if (Array.isArray(params)) {
      urlSearchParams = new URLSearchParams(params);
    } else {
      Object.keys(params).forEach((key) => {
        const param = params[key];

        if (Array.isArray(param)) {
          param.forEach(value => urlSearchParams.append(key, value));
        } else {
          urlSearchParams.append(key, param);
        }
      });
    }

    return this.apiClient.makeCall<TableData<Resource>>(`/${this.basePath}?${urlSearchParams}`);
  }

  public findById(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`);
  }

  public delete(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`, 'DELETE');
  }

  public create(params: CreateParams): Promise<Resource> {
    const body = params && this.entityKey ? { [this.entityKey]: params } : params;

    return this.apiClient.makeCall<Resource>(`/${this.basePath}`, 'POST', body);
  }

  public update(id: string, params: UpdateParams): Promise<Resource> {
    const body = params && this.entityKey ? { [this.entityKey]: params } : params;

    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`, 'PUT', body);
  }
}
