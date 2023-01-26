import { Variable } from './Variable';
import FormulaCondition from './FormulaCondition';

interface VariableConfiguration<IVariable extends Variable = Variable> {
  id: string;
  variable: IVariable;
  position: number;
  column: number;
  cardId: string;
  required?: boolean;
  default?: boolean;
  conditionalDisplayRule?: FormulaCondition | null;
}

export default VariableConfiguration;
