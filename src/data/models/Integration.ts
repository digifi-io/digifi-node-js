import { ExecutionSource, ExternalIntegrationResultType } from '../../enums';
import { UserBasic, VariableValue } from '../../types';

export interface CompactIntegrationResult {
  id: string;
  organizationId: string;
  integrationId: string;
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
  applicationId?: string;
  applicationDisplayId?: string;
  applicationName?: string | null;
}

export default IntegrationResult;
