import { VariableType, VariableAccessPermission } from '../../enums';
import {  UserShort, PermissionGroupId } from '../../types';

export type NumericDataType =
  | 'Number'
  | 'Monetary'
  | 'Percentage';

export type StringDataType =
  | 'List'
  | 'Text'
  | 'LargeText'
  | 'PhoneNumber'
  | 'EmailAddress'
  | 'IdentificationNumber';

export type VariablePermissions = Record<
  PermissionGroupId,
  VariableAccessPermission
>;

export interface Variable {
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
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  permissions: VariablePermissions;
  updateDate: Date;
  organizationId: string;
  description?: string;
}

export default Variable;
