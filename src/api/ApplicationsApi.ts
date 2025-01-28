import { SystemApi } from './base/SystemApi';
import { CreateBorrowerParams } from './BorrowersApi';
import {
  UserShort,
  VariableValue,
  SearchHighlight,
  PaginationParams,
  ApplicationStatusPermissions,
  PaginationResult,
} from '../types';
import { CreateIntermediaryParams } from './IntermediariesApi';
import { BorrowerType, SortDirection } from '../enums';
import { ApplicationStatusType } from './ApplicationStatusesApi';
import { CursorPaginationParams, CursorPaginationResult } from '../types/Pagination';

export enum ApplicationDefaultVariable {
  LoanAmount = 'loan_amount',
}

export enum ApplicationSortField {
  BorrowerFullName = 'borrowerFullName',
  DisplayId = 'displayId',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  BorrowerPhoneNumber = 'borrowerPhoneNumber',
  BorrowerEmail = 'borrowerEmail',
  LoanAmount = 'loanAmount',
  Intermediary = 'intermediaryName',
  SearchRelevance = 'searchRelevance',
}

export type VariableFilterValueQueryParam = string | string[] | {
  to?: string;
  from?: string;
};

export type VariableFilterParams = { [name: string]: VariableFilterValueQueryParam };

export type BorrowerIdTarget = 'borrower' | 'coborrowers';


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
    type: ApplicationStatusType;
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
    organizationVersion: number;
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

export interface SearchApplicationsParams extends PaginationParams<ApplicationSortField>{
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
  productId?: string;
  formattedSearch?: string;
  visibleOnBoard?: boolean;
  onlyInProgress?: boolean;
  onlyInApprovedStatus?: boolean;
  onlyInRejectedStatus?: boolean;
  searchByFields?: string[];
  searchByVariables?: string[];
  filterByVariables?: VariableFilterParams;
  sortByFields?: { [name: string]: SortDirection };
  sortByVariables?: { [name: string]: SortDirection };
  onlyInFinalStatus?: boolean;
  borrowerIdTargets?: BorrowerIdTarget[];
  productIds?: string[];
}

export interface ListApplicationParams extends CursorPaginationParams {
  borrowerId?: string;
  statusIds?: string[];
  productId?: string;
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

export interface RunAutomationWorkflowParams {
  automationWorkflowId: string;
}

export type UpdateApplicationCoBorrowersParams = DeleteCoBorrowerParams | AddCoBorrowersParams;

export interface ApplicationsApi {
  search(params: SearchApplicationsParams): Promise<PaginationResult<Application>>;
  list(params: ListApplicationParams): Promise<CursorPaginationResult<Application>>;
  findById(id: string): Promise<Application>;
  findByDisplayId(displayId: string): Promise<Application>;
  create(params: CreateApplicationParams): Promise<Application>;
  update(id: string, params: UpdateApplicationParams): Promise<Application>;
  updateCoBorrowers(id: string, params: UpdateApplicationCoBorrowersParams): Promise<Application>;
  updateIntermediary(id: string, params: UpdateApplicationIntermediaryParams): Promise<Application>;
  getVariables(id: string, variablesToInclude?: string[]): Promise<Record<string, VariableValue>>;
  runCalculations(id: string, params: RunApplicationCalculationsParams): Promise<Application>;
  addLabels(id: string, labelsIds: string[]): Promise<Application>;
  addTeamMembers(id: string, teamMembersIds: string[]): Promise<Application>;
  delete(id: string): Promise<Application>;
  runAutomation(id: string, params: RunAutomationWorkflowParams): Promise<void>;
}

export class ApplicationsRestApi extends SystemApi<
  Application,
  CreateApplicationParams,
  UpdateApplicationParams,
  SearchApplicationsParams,
  ListApplicationParams
> implements ApplicationsApi {
  protected path = '/applications';

  public findByDisplayId(displayId: string): Promise<Application> {
    return this.apiClient.makeCall<Application>(`${this.path}/${displayId}?identifierType=displayId`);
  }

  public updateCoBorrowers(applicationId: string, params: UpdateApplicationCoBorrowersParams) {
    return this.apiClient.makeCall<Application>(`${this.path}/${applicationId}/coborrowers`, 'PUT', params);
  }

  public updateIntermediary(applicationId: string, params: UpdateApplicationIntermediaryParams) {
    return this.apiClient.makeCall<Application>(`${this.path}/${applicationId}/intermediary`, 'PUT', params);
  }

  public getVariables(applicationId: string, variablesToInclude?: string[]) {
    const urlSearchParams = new URLSearchParams();

    if (variablesToInclude) {
      variablesToInclude.forEach((variable) => {
        urlSearchParams.append('variablesToInclude', variable);
      })
    }

    return this.apiClient.makeCall<Record<string, VariableValue>>(`${this.path}/${applicationId}/variables?${urlSearchParams}`);
  }

  public runCalculations(applicationId: string, params: RunApplicationCalculationsParams) {
    return this.apiClient.makeCall<Application>(`${this.path}/${applicationId}/run-calculations`, 'POST', params);
  }

  public addLabels(applicationId: string, labelsIds: string[]) {
    return this.apiClient.makeCall<Application>(`${this.path}/${applicationId}/labels`, 'POST', {
      labelsIds,
    });
  }

  public addTeamMembers(applicationId: string, teamMembersIds: string[]) {
    return this.apiClient.makeCall<Application>(`${this.path}/${applicationId}/team-members`, 'POST', {
      teamMembersIds,
    });
  }

  public runAutomation(applicationId: string, params: RunAutomationWorkflowParams) {
    return this.apiClient.makeCall<void>(`${this.path}/${applicationId}/run-automation`, 'POST', params);
  }
}
