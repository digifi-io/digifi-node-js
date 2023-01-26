import { ApplicationStatusPermissions } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { Variable } from '../../data/models';

export enum ComparisonOperator {
  Cap = 'CAP',
  Floor = 'FLOOR',
  Range = 'RANGE',
  Equal = 'EQUAL',
  NotEqual = 'NOT EQUAL',
  In = 'IN',
  NotIn = 'NOT IN',
  Lt = 'LT',
  Gt = 'GT',
  Exists = 'EXISTS',
  DeepEqual = 'DEEPEQUAL',
  NotDeepEqual = 'NOT DEEPEQUAL',
  IsNull = 'IS NULL',
  IsNotNull = 'IS NOT NULL',
}

export enum ComparisonOperandType {
  Variable = 'variable',
  Value = 'value',
}

export enum RuleType {
  And = 'AND',
  Or = 'OR',
}

export interface MultipleRule {
  sourceVariable: Variable;
  sourceComponent?: string | null;
  firstOperandVariable?: Variable;
  firstOperandValue: string;
  firstOperandComponent?: string | null;
  firstOperandType: ComparisonOperandType;
  secondOperandVariable?: Variable;
  secondOperandValue: string;
  secondOperandComponent?: string | null;
  secondOperandType: ComparisonOperandType;
  comparisonOperator: ComparisonOperator;
}

export interface ApplicationStatusRule {
  id: string;
  statusId: string;
  productId: string;
  ruleType: RuleType;
  multipleRules: MultipleRule[];
  createdAt: Date;
}

export interface ApplicationStatus {
  id: string;
  systemId: string;
  productId: string;
  position: number;
  name: string;
  permissionGroupsToMoveApplicationIntoStatus: ApplicationStatusPermissions;
  permissionGroupsToEditApplication: ApplicationStatusPermissions;
  permissionGroupsAbleToViewApplicationOnBoard: ApplicationStatusPermissions;
  duplicatedFrom?: string;
  rules: ApplicationStatusRule[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class ApplicationStatusesApi {
  protected basePath = '/application-statuses';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(productId: string): Promise<ApplicationStatus[]> {
    const urlSearchParams = getSearchParams({ productId });

    return this.apiClient.makeCall<ApplicationStatus[]>(`/${this.basePath}?${urlSearchParams}`);
  }
}
