import { SystemApi } from '../SystemApi';
import { VariableValue, UserShort, SearchHighlight, PaginationParams, PaginationResult } from '../../types';
import getSearchParams from '../../utils/getSearchParams';
import { SearchParams } from '../BaseSystemApi';
import { CursorPaginationResult, CursorPaginationParams } from '../../types/Pagination';
import ApiVersion from '../../enums/ApiVersion';
import ApiVersionError from '../../errors/ApiVersionError';

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

export interface FindIntermediariesParams extends PaginationParams<IntermediarySortField> {
  dueCreatedDateFrom?: Date;
  dueCreatedDateTo?: Date;
  dueUpdatedDateFrom?: Date;
  dueUpdatedDateTo?: Date;
  /**
   * @deprecated Use intermediaryTypes instead.
   */
  borrowerTypeIds?: string[];
  intermediaryTypes?: string[];
  teamMemberIds?: string[];
  searchBy?: string[];
}

export interface ListIntermediariesParams extends CursorPaginationParams {
  email?: string;
  idNumber?: string;
}

export enum IntermediarySuggestionsSortField {
  Name = 'name',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
}

export interface FindIntermediarySuggestionsParams {
  name?: string;
  phoneNumber?: string;
  email?: string;
  idNumber?: string;
  sortField?: IntermediarySuggestionsSortField;
}

export default class IntermediariesApi extends SystemApi<
  Intermediary,
  CreateIntermediaryParams,
  UpdateIntermediaryParams,
  FindIntermediariesParams,
  ListIntermediariesParams
> {
  protected path = 'intermediaries';

  public async find(params: FindIntermediariesParams): Promise<PaginationResult<Intermediary>> {
    if (!this.apiVersion || this.apiVersion === ApiVersion.Legacy) {
      const intermediaries = await super.find(params);

      return intermediaries as PaginationResult<Intermediary>;
    }

    const intermediaries = await super.search(params);

    return intermediaries as PaginationResult<Intermediary>;
  }

  public async list(params: ListIntermediariesParams): Promise<CursorPaginationResult<Intermediary>> {
    if (!this.apiVersion || this.apiVersion === ApiVersion.Legacy) {
      throw new ApiVersionError('Method is not supported for this API version');
    }

    const intermediaries = await super.list(params);

    return intermediaries as CursorPaginationResult<Intermediary>;
  }

  public getSuggestions(params: FindIntermediarySuggestionsParams): Promise<Intermediary[]> {
    const queryParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall<Intermediary[]>(`/${this.path}/suggestions?${queryParams}`);
  }

  public createMany(intermediaries: CreateIntermediaryParams[]): Promise<Intermediary[]> {
    return this.apiClient.makeCall<Intermediary[]>(`/${this.path}/bulk`, 'POST', {
      intermediaries: intermediaries,
    });
  }
}
