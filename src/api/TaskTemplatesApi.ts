import { IApiClient } from '../clients';
import { FormulaBasedValidationRule, FormulaBasedRule, ConditionalFormattingRule } from '../data/models';
import { FormulaInputsMetadata } from '../data/models/FormulaCompilation';

export interface TaskTemplateVariableConfig {
  id: string;
  variable: string;
  required?: boolean;
  conditionalDisplayRule?: FormulaBasedRule | null;
  validationRule?: FormulaBasedValidationRule | null;
  conditionalFormattingRules?: ConditionalFormattingRule[] | null;
  failedFormattingConditionColor?: string | null;
}

export interface TaskTemplateConfig {
  title: string;
  internalInstructionsText: string | null;
  externalInstructionsText: string | null;
  labelIdsToAssign: string[] | null;
  dueTime: string | null;
  daysUntilDue: number | null;
  blockedApplicationStatusIds: string[] | null;
  autoPassConditionFormula: string | null;
  autoPassConditionFormulaInputsMetadata: FormulaInputsMetadata | null;
  variables: TaskTemplateVariableConfig[] | null;
}

export interface TaskTemplate {
  id: string;
  organizationId: string;
  organizationVersion: number;
  config: TaskTemplateConfig;
  productId: string;
  name: string;
  archived: boolean;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string;
  updatedById?: string;
  duplicatedFrom?: string;
}

export interface TaskTemplatesApi {
  findById(id: string): Promise<TaskTemplate>;
}

export class TaskTemplatesRestApi implements TaskTemplatesApi {
  protected path = '/task-templates';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public findById(id: string): Promise<TaskTemplate> {
    return this.apiClient.makeCall<TaskTemplate>(`${this.path}/${id}`);
  }
}
