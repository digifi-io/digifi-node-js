import { VariableConfigurationViewModel } from '../../data/models/VariableConfigurationViewModel';

export interface CardViewModel<VariableConfiguration extends VariableConfigurationViewModel = VariableConfigurationViewModel> {
  id: string;
  name: string;
  position: number;
  row: number;
  organizationId: string;
  fields: VariableConfiguration[];
}
