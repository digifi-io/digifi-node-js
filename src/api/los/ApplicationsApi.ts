import { SystemApi } from '../SystemApi';
import { CreateBorrowerParams } from './BorrowersApi';
import {
  UserShort,
  VariableValue,
  SearchHighlight,
  PaginationParams,
  PaginationResult,
  ApplicationStatusPermissions,
} from '../../types';
import { CreateIntermediaryParams } from './IntermediariesApi';
import { BorrowerType, SortDirection } from '../../enums';

export enum ApplicationDefaultVariable {
  LoanAmount = 'loan_amount',
}

export interface Application {
  id: string;
  organizationId: string;
  displayId: string;
  variables: Record<string, VariableValue>;
  status: {
    id: string;
    name: string;
    permissionGroupsAbleToViewApplicationOnBoard: ApplicationStatusPermissions;
    permissionGroupsToEditApplication: ApplicationStatusPermissions;
    permissionGroupsToMoveApplicationIntoStatus: ApplicationStatusPermissions;
    archivedAt?: Date;
  };
  borrowerId: string;
  coborrowerIds: string[];
  intermediaryId?: string;
  declineReasons?: string[];
  teamMembers: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarId?: string;
  }[];
  labels: {
    id: string;
    name: string;
    color: string;
  }[];
  borrowerType: BorrowerType;
  coborrowerTypes: BorrowerType[];
  product: {
    id: string;
    name: string;
    organizationId: string;
    organizationVersion: number | null;
    borrowerTypes: BorrowerType[];
  };
  testing?: boolean;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  originalApplicationId?: string;
  transitionedToStatusAt?: Date | null;
  highlights?: SearchHighlight[];
}

export interface CreateApplicationParams {
  productId: string;
  statusId?: string;
  borrower: string | CreateBorrowerParams;
  coBorrowers: Array<string | CreateBorrowerParams>;
  intermediary?: string | CreateIntermediaryParams;
  teamMembers?: string[];
  labelsIds?: string[];
  variables: Record<string, VariableValue>;
}

export interface UpdateApplicationParams {
  statusId?: string;
  declineReasons?: string[];
  teamMembers?: string[];
  labelsIds?: string[];
  variables?: Record<string, VariableValue>;
}

export enum ApplicationSortField {
  BorrowerFullName = 'borrowerFullName',
  DisplayId = 'displayId',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Status = 'status',
  BorrowerPhoneNumber = 'borrowerPhoneNumber',
  BorrowerEmail = 'borrowerEmail',
  LoanAmount = 'loanAmount',
  Intermediary = 'intermediaryName',
  Product = 'productName',
  SearchRelevance = 'searchRelevance',
}

export interface RangeQueryParam {
  to?: string;
  from?: string;
}

type VariableSimpleFilterValue = string | string[];

export type VariableFilterValueQueryParam = VariableSimpleFilterValue | RangeQueryParam;
export type VariableFilterParams = { [name: string]: VariableFilterValueQueryParam };

export interface FindApplicationsParams extends PaginationParams<ApplicationSortField>{
  displayId?: string;
  statusIds?: string[];
  labelIds?: string[];
  intermediaryIds?: string[];
  teamMemberIds?: string[];
  createdAtFrom?: Date;
  createdAtTo?: Date;
  updatedAtFrom?: Date;
  updatedAtTo?: Date;
  borrowerId?: string;
  borrowerIds?: string[];
  productId?: string;
  formattedSearch?: string;
  visibleOnBoard?: boolean;
  originalApplication?: string;
  onlyInProgress?: boolean;
  searchByFields?: string[];
  searchByVariables?: string[];
  filterByVariables?: VariableFilterParams;
  sortByFields?: { [name: string]: SortDirection };
  sortByVariables?: { [name: string]: SortDirection };
  onlyInFinalStatus?: boolean;
}

interface DeleteCoBorrowerParams {
  coBorrowerIdToDelete: string;
}

interface AddCoBorrowersParams {
  coBorrowersToAdd: Array<string | CreateBorrowerParams>;
}

export interface UpdateApplicationIntermediaryParams {
  intermediary: string | CreateIntermediaryParams | null;
}

export interface RunApplicationCalculationsParams {
  variablesToRun?: string[];
}

export type UpdateApplicationCoBorrowersParams = DeleteCoBorrowerParams | AddCoBorrowersParams;

export default class ApplicationsApi extends SystemApi<
  Application,
  CreateApplicationParams,
  UpdateApplicationParams,
  FindApplicationsParams
> {
  protected path = 'applications';

  public async find(params: FindApplicationsParams): Promise<PaginationResult<Application>> {
    const applications = await super.find(params);

    return applications as PaginationResult<Application>;
  }

  public updateCoBorrowers(applicationId: string, params: UpdateApplicationCoBorrowersParams) {
    return this.apiClient.makeCall<Application>(`/${this.path}/${applicationId}/coborrowers`, 'PUT', params);
  }

  public updateIntermediary(applicationId: string, params: UpdateApplicationIntermediaryParams) {
    return this.apiClient.makeCall<Application>(`/${this.path}/${applicationId}/intermediary`, 'PUT', params);
  }

  public getVariables(applicationId: string, variablesToInclude?: string[]) {
    const urlSearchParams = new URLSearchParams();

    if (variablesToInclude) {
      variablesToInclude.forEach((variable) => {
        urlSearchParams.append('variablesToInclude', variable);
      })
    }

    return this.apiClient.makeCall<Record<string, VariableValue>>(`/${this.path}/${applicationId}/variables?${urlSearchParams}`);
  }

  public runCalculations(applicationId: string, params: RunApplicationCalculationsParams) {
    return this.apiClient.makeCall<Application>(`/${this.path}/${applicationId}/run-calculations`, 'POST', params);
  }

  public addLabels(applicationId: string, labelsIds: string[]) {
    return this.apiClient.makeCall<Application>(`/${this.path}/${applicationId}/labels`, 'POST', {
      labelsIds,
    });
  }

  public addTeamMembers(applicationId: string, teamMembersIds: string[]) {
    return this.apiClient.makeCall<Application>(`/${this.path}/${applicationId}/team-members`, 'POST', {
      teamMembersIds,
    });
  }
}
