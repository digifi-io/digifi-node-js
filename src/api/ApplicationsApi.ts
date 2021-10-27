import { SystemApi } from './SystemApi';
import { BorrowerType, CreateBorrowerParams } from './BorrowersApi';
import {UserRole, UserShortInfo, VariableValue} from '../types';
import { CreateIntermediaryParams } from './IntermediariesApi';

export enum ApplicationDefaultVariable {
  LoanAmount = 'loan_amount',
}

export interface Application {
  id: string;
  displayId: number;
  variables: Record<string, VariableValue>;
  status: {
    id: string;
    name: string;
    rolesAbleToViewApplicationOnBoard: UserRole[];
    permissionsToEditApplication: UserRole[];
    permissionsToMoveApplicationIntoStatus: UserRole[];
  };
  borrowerId: string;
  coborrowerIds: string[];
  intermediaryId?: string;
  declineReasons?: string[];
  organization: string;
  teamMembers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  }>;
  labels: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  borrowerType: BorrowerType;
  coborrowerTypes: BorrowerType[];
  product: {
    id: string;
    name: string;
    organizationId: string;
    borrowerTypes: BorrowerType[];
  };
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  originalApplicationId?: string;
  transitionedToStatusAt?: Date;
}

export interface CreateApplicationParams {
  product: string;
  teamMembers?: string[];
  labels?: string[];
  status?: string;
  borrower: string | CreateBorrowerParams;
  coborrowers: Array<string | CreateBorrowerParams>;
  intermediary?: string | CreateIntermediaryParams;
  variables: Record<string, VariableValue>;
}

export interface UpdateApplicationParams {
  status?: string;
  declineReasons?: string[];
  intermediaryId?: string;
  teamMembers?: string[];
  labels?: string[];
  variables?: Record<string, VariableValue>;
}

export interface DeleteCoBorrowerParams {
  coBorrowerToDelete: string;
}

export interface AddCoBorrowersParams {
  coBorrowersToAdd: Array<string | CreateBorrowerParams>;
}

export interface UpdateApplicationIntermediaryParams {
  intermediary: string | CreateIntermediaryParams | null;
}

export type UpdateApplicationCoBorrowersParams = DeleteCoBorrowerParams | AddCoBorrowersParams;

export default class ApplicationsApi extends SystemApi<Application, CreateApplicationParams, UpdateApplicationParams> {
  protected basePath = 'applications';
  protected entityKey = 'application';

  public updateCoBorrowers(applicationId: string, params: UpdateApplicationCoBorrowersParams) {
    return this.apiClient.makeCall<Application>(`/${this.basePath}/${applicationId}/coborrowers`, 'PUT', params);
  }

  public updateIntermediary(applicationId: string, params: UpdateApplicationIntermediaryParams) {
    return this.apiClient.makeCall<Application>(`/${this.basePath}/${applicationId}/intermediary`, 'PUT', params);
  }
}
