import VariableConfiguration from './VariableConfiguration';

interface Card<Configuration extends VariableConfiguration = VariableConfiguration> {
  id: string;
  name: string;
  position: number;
  row: number;
  organizationId: string;
  fields: Configuration[];
}

export default Card;
