import { SystemApi } from './SystemApi';
import { BorrowerType, CreateBorrowerParams } from './BorrowersApi';
import { UserShortInfo, VariableValue } from '../types';
import { CreateIntermediaryParams } from './IntermediariesApi';

export enum ApplicationDefaultVariable {
  LoanAmount = 'loan_amount',
}

export interface ApplicationVariables extends Record<string, VariableValue> {
  [ApplicationDefaultVariable.LoanAmount]: number;
}

export interface Application {
  id: string;
  displayId: number;
  variables: ApplicationVariables;
  status: {
    id: string;
    name: string;
  };
  borrowerId: string;
  coborrowerId?: string;
  intermediaryId?: string;
  declineReasons?: string[];
  teamMembers: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  }[];
  labels: {
    id: string;
    name: string;
    color: string;
  }[];
  borrowerType: BorrowerType;
  coborrowerType?: BorrowerType;
  product: {
    id: string;
    name: string;
    organizationId: string;
    borrowerType: BorrowerType;
  };
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
}

export interface CreateApplicationOptions {
  product: string;
  teamMembers?: string[];
  labels?: string[];
  status?: string;
  borrowerId?: string;
  coborrowerId?: string;
  intermediaryId?: string;
  borrower?: Pick<CreateBorrowerParams, 'variables'>;
  coborrower?: Pick<CreateBorrowerParams, 'variables'>;
  intermediary?: Pick<CreateIntermediaryParams, 'variables'>;
  variables: ApplicationVariables;
}

export interface UpdateApplicationParams {
  status?: string;
  declineReasons?: string[];
  intermediaryId?: string;
  teamMembers?: string[];
  labels?: string[];
  variables?: Partial<ApplicationVariables>;
}

export default class ApplicationsApi extends SystemApi<Application, CreateApplicationOptions, UpdateApplicationParams> {
  protected basePath = 'applications';
}
