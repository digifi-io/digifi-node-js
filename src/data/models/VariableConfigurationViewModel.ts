import { VariableViewModel } from '../../data/models/VariableViewModel';
import { FormulaConditionViewModel } from '../../data/models/FormulaConditionViewModel';

export interface VariableConfigurationViewModel<IVariable extends VariableViewModel = VariableViewModel> {
  id: string;
  variable: IVariable;
  position: number;
  column: number;
  cardId: string;
  required?: boolean;
  default?: boolean;
  conditionalDisplayRule?: FormulaConditionViewModel | null;
}
