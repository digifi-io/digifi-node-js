import { AuthorizedApiClient } from '../../clients';
import { DecisionRunResult } from '../../enums';
import { VariableValue } from '../../types';

export interface MakeDecisionParams {
  strategy: string;
  applicationId: string;
  decisionName?: string;
  successStatus?: string;
  failureStatus?: string;
}

export interface ApplicationDecision {
  id: string;
  name: string;
  applicationId: string;
  strategyDisplayName: string;
  result: DecisionRunResult;
  outputs: Record<string, VariableValue>;
  userId?: string;
}

class ApplicationDecisionProcessingApi {
  protected path = '/application-decision-processing';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public makeDecision(params: MakeDecisionParams): Promise<ApplicationDecision> {
    return this.apiClient.makeCall(`${this.path}`, 'POST', params);
  }
}

export default ApplicationDecisionProcessingApi;
