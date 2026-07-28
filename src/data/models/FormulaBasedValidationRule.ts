import { FormulaBasedRule } from './FormulaBasedRule';

export interface FormulaBasedValidationRule extends FormulaBasedRule {
  errorMessage: string;
}
