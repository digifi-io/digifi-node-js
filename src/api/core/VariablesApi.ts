import { AuthorizedApiClient } from '../../clients';
import { VariableType } from '../../enums';
import { StringDataType, NumericDataType, VariablePermissions } from '../../data/models';

export interface VariableBasicInfo {
  id: string;
  displayName: string;
  systemName: string;
  isArchived: boolean;
  dataType: VariableType;
  stringFormat: StringDataType | null;
  numberFormat: NumericDataType | null;
  optionsList: string[] | null;
}

export interface VariableShort extends VariableBasicInfo {
  name: string;
  identificationNumberType: string | null;
  identificationNumberDescription: string | null;
  dateFormat: string | null;
  currency: string | null;
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

  public getVariableBySystemName(systemName: string): Promise<VariableShort> {
    return this.apiClient.makeCall(`${this.path}/${systemName}`);
  }
}

export default VariablesApi;
