import { ExecutionSource, ExternalIntegrationResultType } from '../../enums';
import { UserBasic, VariableValue } from '../../types';

export interface CompactIntegrationResult {
  id: string;
  organization: string;
  integration: string;
  integrationName: string;
  createdAt: Date;
  updatedAt: Date;
  source: ExecutionSource;
  executionTime: number;
  result: ExternalIntegrationResultType;
  createdBy: UserBasic | null;
  testing?: boolean;
}

export interface IntegrationResult extends CompactIntegrationResult {
  inputs: Record<string, VariableValue>;
  outputs: Record<string, VariableValue>;
  statusCode: number;
  error?: string | null;
  application?: string;
  applicationDisplayId?: string;
  applicationName?: string | null;
}

export default IntegrationResult;
