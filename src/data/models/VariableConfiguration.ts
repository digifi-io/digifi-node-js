import FormulaCondition from './FormulaCondition';

export interface VariableConfiguration {
  id: string;
  variable: string;
  position: number;
  column: number;
  card: string;
  organization: string;
  organizationVersion: number | null;
  required?: boolean;
  default?: boolean;
  conditionalDisplayRule?: FormulaCondition | null;
  createdAt?: Date;
  updatedAt?: Date;
}


export default VariableConfiguration;
