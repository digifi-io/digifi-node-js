import { IApiClient } from '../clients';
import { PaginationResult } from '../types';
import getSearchParams from '../utils/getSearchParams';

export type SearchParams = Record<string, unknown> | Array<string[]>;

export abstract class BaseSystemApi<Resource, FindParams = undefined> {
  protected path = '';

  protected constructor(
    protected apiClient: IApiClient,
  ) {}

  public find(params: FindParams): Promise<PaginationResult<Resource> | Resource[]> {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall<PaginationResult<Resource>>(`/${this.path}?${urlSearchParams}`);
  }

  public findById(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}/${id}`);
  }

  public delete(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}/${id}`, 'DELETE');
  }
}
