import { IApiClient } from '../../clients';
import { VariableAccessPermission, VariableType } from '../../enums';
import { VisualDataType } from '../../data/models';
import { PermissionGroupId, UserShortInfo, PaginationResult } from '../../types';

export interface FindVariableParams {
  onlyStandard?: boolean;
  onlyCustom?: boolean;
  id?: string;
  ids?: string[];
  systemName?: string;
  dependsOn?: string;
  excludeArchived?: boolean;
  systemNames?: string[];
  stringFormat?: StringVisualDataType;
  numberFormat?: NumericVisualDataType;
  dataType?: VariableType | VariableType[];
  excludeDataTypes?: string[];
  visualDataType?: VisualDataType;
  dueCreatedDateFrom?: Date | string;
  dueCreatedDateTo?: Date | string;
  dueUpdatedDateFrom?: Date | string;
  dueUpdatedDateTo?: Date | string;
  teamMembersIds?: string[];
}

export enum StringVisualDataType {
  List = 'List',
  Text = 'Text',
  LargeText = 'LargeText',
  PhoneNumber = 'PhoneNumber',
  EmailAddress = 'EmailAddress',
  IdentificationNumber = 'IdentificationNumber',
}

export enum NumericVisualDataType {
  Number = 'Number',
  Monetary = 'Monetary',
  Percentage = 'Percentage',
}

interface BasicVariable {
  id: string;
  name: string;
  systemName: string;
  organizationId: string;
  organizationVersion: number;
  isArchived: boolean;
  dataType: VariableType;
  visualDataType: VisualDataType;
}

export interface TableColumn {
  id: string;
  name: string;
  systemName: string;
  dataType: VariableType;
  visualDataType: VisualDataType;
  visualAttributes: VariableVisualAttributes;
  required?: boolean;
}

export interface VariableVisualAttributes {
  dateFormat?: string;
  currency?: string;
  phoneNumberFormat?: string;
  optionsList?: string[];
  identificationNumberType?: string;
  identificationNumberDescription?: string | null;
  maxAllowedValue?: string | null;
  minAllowedValue?: string | null;
  columns?: TableColumn[];
}

export type VariablePermissions = Record<
  PermissionGroupId,
  VariableAccessPermission
>;

type BasicVariableWithVisualAttributes = BasicVariable & {
  permissions: VariablePermissions;
  visualAttributes: VariableVisualAttributes;
}

export interface Variable extends BasicVariableWithVisualAttributes {
  isStandard: boolean;
  dependsOn?: string | null;
  description?: string;
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
  updatedAt: Date;
  createdAt: Date;
}

class VariablesApi {
  protected path = '/variables'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(params: FindVariableParams): Promise<PaginationResult<Variable>> {
    return this.apiClient.makeCall(`${this.path}/search`, 'PUT', params);
  }
}

export default VariablesApi;
