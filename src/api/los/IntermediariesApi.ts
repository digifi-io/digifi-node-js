import { SystemApi } from '../SystemApi';
import { VariableValue, UserShort, SearchHighlight, PaginationParams, PaginationResult } from '../../types';
import getSearchParams from '../../utils/getSearchParams';
import { SearchParams } from '../BaseSystemApi';

export enum IntermediaryDefaultValue {
  Name = 'intermediary_name',
  IdNumber = 'intermediary_id_number',
  PhoneNumber = 'intermediary_phone',
  Email = 'intermediary_email',
  Type = 'intermediary_type',
}

export interface Intermediary {
  id: string;
  organization: string;
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
  borrowerTypeIds?: string[];
  teamMemberIds?: string[];
  searchBy?: string[];
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
  FindIntermediariesParams
> {
  protected basePath = 'intermediaries';
  protected entityKey = 'intermediary';

  public async find(params: FindIntermediariesParams): Promise<PaginationResult<Intermediary>> {
    const intermediaries = await super.find(params);

    return intermediaries as PaginationResult<Intermediary>;
  }

  public getSuggestions(params: FindIntermediarySuggestionsParams): Promise<Intermediary[]> {
    const queryParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall<Intermediary[]>(`/${this.basePath}/suggestions?${queryParams}`);
  }

  public bulkUpload(intermediariesToUpload: CreateIntermediaryParams[]): Promise<Intermediary[]> {

    return this.apiClient.makeCall<Intermediary[]>(`/${this.basePath}/bulk`, 'POST', {
      'intermediaries': [
        ...intermediariesToUpload.map((intermediary) => (
          {
            'intermediary': intermediary,
          }
        )),
      ],
    });
  }
}
