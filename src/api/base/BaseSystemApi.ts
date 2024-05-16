import { IApiClient } from '../../clients';
import { PaginationResult } from '../../types';
import { CursorPaginationResult } from '../../types/Pagination';
import getSearchParams from '../../utils/getSearchParams';

export type SearchParams = Record<string, unknown> | Array<string[]>;

export abstract class BaseSystemApi<Resource, FindParams = undefined, ListParams = undefined> {
  protected path = '';

  protected constructor(
    protected apiClient: IApiClient,
  ) {}

  public find(params: FindParams): Promise<PaginationResult<Resource> | Resource[]> {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall<PaginationResult<Resource>>(`/${this.path}?${urlSearchParams}`);
  }

  public search(params: FindParams): Promise<PaginationResult<Resource>> {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall<PaginationResult<Resource>>(`/${this.path}/search?${urlSearchParams}`);
  }

  public list(params: ListParams): Promise<CursorPaginationResult<Resource>> {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall<CursorPaginationResult<Resource>>(`/${this.path}?${urlSearchParams}`);
  }

  public findById(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}/${id}`);
  }

  public delete(id: string): Promise<Resource> {
    return this.apiClient.makeCall<Resource>(`/${this.path}/${id}`, 'DELETE');
  }
}
