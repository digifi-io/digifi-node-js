import ApiClient from '../ApiClient';

export abstract class SystemApi<Resource, CreateParams = undefined, UpdateParams = undefined> {
  protected basePath = '';
  protected entityKey = '';

  constructor(
    protected apiClient: ApiClient,
  ) {}

  public getAll(): Promise<Resource[]> {
    return this.apiClient.makeCall<Resource[]>(`/${this.basePath}`);
  }

  public getById(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`);
  }

  public delete(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`, 'DELETE');
  }

  public create(params: CreateParams): Promise<Resource> {
    const body = params && this.entityKey ? { [this.entityKey]: params } : undefined;

    return this.apiClient.makeCall<Resource>(`/${this.basePath}`, 'POST', body);
  }

  public update(id: string, params: UpdateParams): Promise<Resource> {
    const body = params && this.entityKey ? { [this.entityKey]: params } : undefined;

    return this.apiClient.makeCall<Resource>(`/${this.basePath}/${id}`, 'PUT', body);
  }
}
