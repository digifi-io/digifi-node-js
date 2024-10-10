import { SystemApi } from './base/SystemApi';
import { VariableValue, UserShort, SearchHighlight, PaginationParams, PaginationResult } from '../types';
import getSearchParams from '../utils/getSearchParams';
import { SearchParams } from './base';
import { CursorPaginationParams, CursorPaginationResult } from '../types/Pagination';

export enum IntermediarySortField {
  Name = 'name',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Type = 'type',
  IdNumber = 'idNumber',
  SearchRelevance = 'searchRelevance',
}

export enum IntermediarySuggestionsSortField {
  Name = 'name',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
}

export enum IntermediaryDefaultValue {
  Name = 'intermediary_name',
  IdNumber = 'intermediary_id_number',
  PhoneNumber = 'intermediary_phone',
  Email = 'intermediary_email',
  Type = 'intermediary_type',
}

export interface Intermediary {
  id: string;
  organizationId: string;
  testing?: boolean;
  variables: Record<string, VariableValue>;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  highlights?: SearchHighlight[];
}

export interface CreateIntermediaryParams {
  variables: Record<string, VariableValue>;
}

export interface UpdateIntermediaryParams {
  variables?: Record<string, VariableValue>;
}

export interface SearchIntermediariesParams extends PaginationParams<IntermediarySortField> {
  dueCreatedDateFrom?: Date;
  dueCreatedDateTo?: Date;
  dueUpdatedDateFrom?: Date;
  dueUpdatedDateTo?: Date;
  intermediaryTypes?: string[];
  teamMemberIds?: string[];
  email?: string;
  searchBy?: string[];
}

export interface ListIntermediariesParams extends CursorPaginationParams {
  email?: string;
  idNumber?: string;
}

export interface FindIntermediarySuggestionsParams {
  name?: string;
  phoneNumber?: string;
  email?: string;
  idNumber?: string;
  sortField?: IntermediarySuggestionsSortField;
}

export interface IntermediariesApi {
  search(params: SearchIntermediariesParams): Promise<PaginationResult<Intermediary>>;
  list(params: ListIntermediariesParams): Promise<CursorPaginationResult<Intermediary>>;
  findById(id: string): Promise<Intermediary>;
  create(params: CreateIntermediaryParams): Promise<Intermediary>;
  bulkCreate(params: CreateIntermediaryParams[]): Promise<Intermediary[]>;
  update(id: string, params: UpdateIntermediaryParams): Promise<Intermediary>;
  getSuggestions(params: FindIntermediarySuggestionsParams): Promise<Intermediary[]>;
  delete(id: string): Promise<Intermediary>;
}

export class IntermediariesRestApi extends SystemApi<
  Intermediary,
  CreateIntermediaryParams,
  UpdateIntermediaryParams,
  SearchIntermediariesParams,
  ListIntermediariesParams
> implements IntermediariesApi {
  protected path = '/intermediaries';

  public getSuggestions(params: FindIntermediarySuggestionsParams): Promise<Intermediary[]> {
    const queryParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall<Intermediary[]>(`${this.path}/suggestions?${queryParams}`);
  }

  public bulkCreate(batches: CreateIntermediaryParams[]): Promise<Intermediary[]> {
    return this.apiClient.makeCall<Intermediary[]>(`${this.path}/bulk`, 'POST', {
      intermediaries: batches,
    });
  }
}
