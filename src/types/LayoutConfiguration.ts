import { FormulaCondition } from '../data/models';

export interface BaseGroup {
  id: string;
  position: number;
  organizationId: string;
  organizationVersion: number;
}

export interface BaseCard {
  id: string;
  name: string;
  position: number;
  organizationId: string;
  organizationVersion: number | null;
  group: string;
  description?: string | null;
}

export interface ConditionalFormattingRule {
  formulaCondition: FormulaCondition;
  color: string;
}

export interface BaseVariableConfiguration {
  id: string;
  variable: string;
  position: number;
  cardId: string;
  default?: boolean;
  required?: boolean;
  organizationVersion: number;
  organizationId: string;
  conditionalDisplayRule?: FormulaCondition | null;
  conditionalFormattingRules?: ConditionalFormattingRule[];
  failedFormattingConditionColor?: string | null;
}
