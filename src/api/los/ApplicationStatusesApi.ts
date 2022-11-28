import { ApplicationStatusPermissions } from '../../types';
import { AuthorizedApiClient } from '../../clients';
import getSearchParams from '../../utils/getSearchParams';
import { FormulaCondition } from '../../data/models';

export interface ApplicationStatusRule {
  id: string;
  status: string;
  organization: string;
  organizationVersion: number | null;
  product: string;
  condition: FormulaCondition;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationStatus {
  id: string;
  product: string;
  organization: string;
  organizationVersion: number | null;
  position: number;
  name: string;
  permissionGroupsToMoveApplicationIntoStatus: ApplicationStatusPermissions;
  permissionGroupsToEditApplication: ApplicationStatusPermissions;
  permissionGroupsAbleToViewApplicationOnBoard: ApplicationStatusPermissions;
  createdAt?: Date;
  updatedAt?: Date;
  rules: ApplicationStatusRule[];
}

export default class ApplicationStatusesApi {
  protected basePath = '/application-statuses';

  constructor(
    private apiClient: AuthorizedApiClient,
  ) {}

  public find(product: string): Promise<ApplicationStatus[]> {
    const urlSearchParams = getSearchParams({ product });

    return this.apiClient.makeCall<ApplicationStatus[]>(`/${this.basePath}?${urlSearchParams}`);
  }
}
