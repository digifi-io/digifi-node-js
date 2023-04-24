import FormulaCondition from './FormulaCondition';

export interface VariableConfiguration {
  id: string;
  variable: string;
  position: number;
  column: number;
  cardId: string;
  organizationId: string;
  organizationVersion: number;
  required?: boolean;
  default?: boolean;
  conditionalDisplayRule?: FormulaCondition | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export default VariableConfiguration;
