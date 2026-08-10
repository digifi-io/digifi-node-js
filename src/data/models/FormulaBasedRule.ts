import { FormulaInputsMetadata } from './FormulaCompilation';

export interface FormulaBasedRule {
  formula: string;
  formulaInputsMetadata: FormulaInputsMetadata;
}
