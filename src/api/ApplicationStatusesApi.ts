import { ApplicationStatusPermissions } from '../types';
import { IApiClient } from '../clients';
import getSearchParams from '../utils/getSearchParams';
import { FormulaCondition } from '../data/models';

export enum ApplicationStatusType {
  Custom = 'custom',
  Initial = 'initial',
  Approve = 'approve',
  Reject = 'reject',
}

export interface ApplicationStatusRule {
  id: string;
  statusId: string;
  organizationId: string;
  organizationVersion: number;
  productId: string;
  condition: FormulaCondition;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationStatus {
  id: string;
  productId: string;
  organizationId: string;
  organizationVersion: number;
  position: number;
  name: string;
  type: ApplicationStatusType;
  permissionGroupsToMoveApplicationIntoStatus: ApplicationStatusPermissions;
  permissionGroupsToEditApplication: ApplicationStatusPermissions;
  permissionGroupsAbleToViewApplicationOnBoard: ApplicationStatusPermissions;
  createdAt?: Date;
  updatedAt?: Date;
  archivedAt?: Date;
  rules: ApplicationStatusRule[];
}

export interface ApplicationStatusesApi {
  find(productId: string): Promise<ApplicationStatus[]>;
}

export class ApplicationStatusesRestApi implements ApplicationStatusesApi {
  protected path = '/application-statuses';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(productId: string): Promise<ApplicationStatus[]> {
    const urlSearchParams = getSearchParams({ productId });

    return this.apiClient.makeCall<ApplicationStatus[]>(`${this.path}?${urlSearchParams}`);
  }
}
