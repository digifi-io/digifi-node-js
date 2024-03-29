import VariableConfiguration from './VariableConfiguration';

export interface RawCard {
  id: string;
  name: string;
  position: number;
  row: number;
  organizationId: string;
  organizationVersion: number,
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Card<IVariableConfiguration extends VariableConfiguration = VariableConfiguration> extends RawCard {
  fields?: IVariableConfiguration[];
}

export default Card;
