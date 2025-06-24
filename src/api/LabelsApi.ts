import { IApiClient } from '../clients';
import { SortDirection } from '../enums';
import { UserShort } from '../types';
import getSearchParams from '../utils/getSearchParams';

export enum LabelSortField {
  Name = 'name',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum LabelReferenceType {
  Application = 'application',
  Task = 'task',
  Document = 'document',
}

export interface Label {
  id: string;
  name: string;
  productId: string;
  referenceType: LabelReferenceType;
  color: string;
  organizationId: string;
  organizationVersion: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
}

export interface FindLabelsParams {
  count: number;
  offset: number;
  sortField: LabelSortField;
  sortDirection: SortDirection;
  includeDeleted: boolean;
  productId: string;
  referenceType: LabelReferenceType;
  search?: string;
}

export interface LabelsApi {
  find(params: FindLabelsParams): Promise<Label[]>;
}

export class LabelsRestApi implements LabelsApi {
  protected path = '/labels';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(params: FindLabelsParams): Promise<Label[]> {
    const urlSearchParams = getSearchParams(params as unknown as Record<string, string>);

    return this.apiClient.makeCall<Label[]>(`${this.path}?${urlSearchParams}`);
  }
}
