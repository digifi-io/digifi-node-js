import { IApiClient } from '../../clients';
import { VariableAccessPermission, VariableType } from '../../enums';
import { VisualDataType } from '../../data/models';
import { PermissionGroupId, UserShortInfo, PaginationResult } from '../../types';
import getSearchParams from '../../utils/getSearchParams';
import { SearchParams } from '../BaseSystemApi';

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

export interface BasicVariable {
  id: string;
  name: string;
  systemName: string;
  organizationId: string;
  organizationVersion: number | null;
  isArchived: boolean;
  dataType: VariableType;
  stringFormat?: StringVisualDataType | null;
  numberFormat?: NumericVisualDataType | null;
}

export interface VariableVisualAttributes {
  dataType: VariableType;
  dateFormat?: string | null;
  numberFormat?: NumericVisualDataType | null;
  stringFormat?: StringVisualDataType | null;
  phoneNumberFormat?: string | null;
  identificationNumberType?: string | null;
  identificationNumberDescription?: string | null;
  optionsList?: string[] | null;
  currency?: string | null;
  maxAllowedValue?: string | null;
  minAllowedValue?: string | null;
}

export type VariablePermissions = Record<
  PermissionGroupId,
  VariableAccessPermission
>;

export type BasicVariableWithVisualAttributes = BasicVariable & VariableVisualAttributes & {
  permissions: VariablePermissions;
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
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall(`${this.path}/search?${urlSearchParams}`);
  }
}

export default VariablesApi;
