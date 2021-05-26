import { SystemApi } from './SystemApi';
import { VariableValue, UserShortInfo } from '../types';

export enum IntermediaryDefaultValue {
  Name = 'intermediary_name',
  IdNumber = 'intermediary_id_number',
  PhoneNumber = 'intermediary_phone',
  Email = 'intermediary_email',
  Type = 'intermediary_type',
  CommissionRate =  'intermediary_commission_rate',
}

interface IntermediaryVariables extends Record<string, VariableValue> {
  [IntermediaryDefaultValue.Name]: string;
}

export interface Intermediary {
  id: string;
  organizationId: string;
  variables: IntermediaryVariables;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
}

export interface CreateIntermediaryParams {
  variables: IntermediaryVariables;
}

interface UpdateIntermediaryParams {
  variables?: Partial<IntermediaryVariables>;
}

export default class IntermediariesApi extends SystemApi<Intermediary, CreateIntermediaryParams, UpdateIntermediaryParams> {
  protected basePath = 'intermediaries';
}
