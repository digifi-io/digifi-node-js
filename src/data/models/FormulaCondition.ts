import { FormulaCompilationWithInputs } from './FormulaCompilation';


interface FormulaCondition {
  formula: string;
  /**
   * @deprecated Use formulaCompilation.customInputNames (systemInputNames) instead (will be removed in next major version)
   */
  formulaRequiredVariables: string[];
  formulaCompilation: FormulaCompilationWithInputs;
}

export default FormulaCondition;
