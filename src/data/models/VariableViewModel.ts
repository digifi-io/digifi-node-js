import { VariableType, VariableAccessPermission } from '../../enums';
import { NumericDataType, StringDataType, UserShortInfo } from '../../types';

export type PermissionGroupId = string;

export type VariablePermissionsViewModel = Record<
  PermissionGroupId,
  VariableAccessPermission
  >;

export interface VariableViewModel {
  id: string;
  displayName: string;
  name: string;
  systemName: string;
  dataType: VariableType;
  numberFormat: NumericDataType | null;
  identificationNumberType: string | null;
  identificationNumberDescription: string | null;
  currency: string | null;
  stringFormat: StringDataType | null;
  phoneNumberFormat: string | null;
  dateFormat: string | null;
  optionsList: string[] | null;
  isStandard: boolean;
  isArchived: boolean;
  dependsOn?: {
    id: string;
    displayName: string;
    systemName: string;
  } | null;
  maxAllowedValue?: string | null;
  minAllowedValue?: string | null;
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
  permissions: VariablePermissionsViewModel;
  updateDate: Date;
  organizationId: string;
  description?: string;
}
