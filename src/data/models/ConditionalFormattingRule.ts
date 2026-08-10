import { FormulaInputsMetadata } from './FormulaCompilation';
import FormulaCondition from './FormulaCondition';

export interface ConditionalFormattingRule {
  formula: string;
  formulaInputsMetadata: FormulaInputsMetadata;
  /**
   * @deprecated Use formulaInputsMetadata or formula fields instead (will be removed in next major version)
   */
  formulaCondition: Omit<FormulaCondition, 'formulaCompilation'>;
  color: string;
}
