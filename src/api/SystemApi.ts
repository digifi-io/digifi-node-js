import ApiClient from '../ApiClient';

export abstract class SystemApi<Resource, CreateParams = undefined, UpdateParams = undefined> {
  protected basePath = '';

  protected constructor(
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

  public create(body: CreateParams): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.basePath}`, 'POST', body as any);
  }

  public update(id: string, body: UpdateParams): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`${this.basePath}`, 'PUT', body as any);
  }
}
