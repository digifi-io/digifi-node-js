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

export interface Intermediary {
  id: string;
  organizationId: string;
  variables: Record<string, VariableValue>;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
}

export interface CreateIntermediaryParams {
  variables: Record<string, VariableValue>;
}

export interface UpdateIntermediaryParams {
  variables?: Record<string, VariableValue>;
}

export default class IntermediariesApi extends SystemApi<Intermediary, CreateIntermediaryParams, UpdateIntermediaryParams> {
  protected basePath = 'intermediaries';
  protected entityKey = 'intermediary';
}
