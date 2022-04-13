import { AuthorizedApiClient } from '../../AuthorizedApiClient';

enum VariableAccessPermission {
  ReadWrite = 'ReadWrite',
  ReadOnly = 'ReadOnly',
  PartialRead = 'PartialRead',
  NoAccess = 'NoAccess'
}

type NumericDataType =
  | 'Number'
  | 'Monetary'
  | 'Percentage';

type StringDataType =
  | 'List'
  | 'Text'
  | 'LargeText'
  | 'PhoneNumber'
  | 'EmailAddress'
  | 'IdentificationNumber';

type VariablePermissions = Record<string, VariableAccessPermission>;

export interface VariableBasicInfo {
  id: string;
  displayName: string;
  systemName: string;
  isArchived: boolean;
  dataType: VariableType;
}

export enum VariableType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Date = 'Date',
}

export interface Variable extends VariableBasicInfo {
  name: string;
  identificationNumberType: string | null;
  identificationNumberDescription: string | null;
  dateFormat: string | null;
  optionsList: string[] | null;
  stringFormat: StringDataType | null;
  currency: string | null;
  numberFormat: NumericDataType | null;
  phoneNumberFormat: string | null;
  maxAllowedValue?: string | null;
  minAllowedValue?: string | null;
  permissions: VariablePermissions;
}

class VariablesApi {
  protected path = '/variables'

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public getVariableBySystemName(systemName: string): Promise<Variable> {
    return this.apiClient.makeCall(`${this.path}/${systemName}`);
  }
}

export default VariablesApi;
