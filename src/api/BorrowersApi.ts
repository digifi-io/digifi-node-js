import { SystemApi } from './base/SystemApi';
import { VariableValue, UserShort, SearchHighlight, PaginationParams, PaginationResult } from '../types';
import { BorrowerType } from '../enums';
import { CursorPaginationParams, CursorPaginationResult } from '../types/Pagination';

export enum BorrowerSortField {
  FullName = 'fullName',
  IdNumber = 'idNumber',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
  SearchRelevance = 'searchRelevance',
}

export enum BorrowerDefaultVariable {
  FirstName = 'borrower_first_name',
  LastName = 'borrower_last_name',
  CompanyName = 'borrower_company_name',
  PersonalIdNumber = 'borrower_personal_id_number',
  CompanyIdNumber = 'borrower_company_id_number',
  PhoneNumber = 'borrower_phone',
  Email = 'borrower_email',
  DateOfBirth = 'borrower_date_of_birth',
  HomeAddress = 'borrower_home_address',
}

export interface Borrower {
  id: string;
  type: BorrowerType;
  organizationId: string;
  variables: Record<string, VariableValue>;
  testing?: boolean;
  locked: boolean;
  lockStartDate?: Date | null;
  lockEndDate?: Date | null;
  lockedBy?: UserShort | null;
  lockReason?: string | null;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  createdAt: Date;
  updatedAt: Date;
  highlights?: SearchHighlight[];
}

export interface CreateBorrowerParams {
  type: BorrowerType;
  variables: Record<string, VariableValue>;
  lockEndDate?: string | null;
  lockReason?: string;
}

export interface UpdateBorrowerParams {
  type?: BorrowerType;
  variables?: Record<string, VariableValue>;
  lockEndDate?: string | null;
  lockReason?: string;
}

export interface SearchBorrowersParams extends PaginationParams<BorrowerSortField>{
  personalIdNumber?: string;
  companyIdNumber?: string;
  email?: string;
  dueCreatedDateFrom?: Date;
  dueCreatedDateTo?: Date;
  dueUpdatedDateFrom?: Date;
  dueUpdatedDateTo?: Date;
  personType?: boolean;
  companyType?: boolean;
  teamMemberIds?: string[];
  searchBy?: string[];
}

interface ListBorrowersParams extends CursorPaginationParams {
  email?: string;
  idNumber?: string;
}

export interface BorrowersApi {
  search(params: SearchBorrowersParams): Promise<PaginationResult<Borrower>>;
  list(params: ListBorrowersParams): Promise<CursorPaginationResult<Borrower>>;
  findById(id: string): Promise<Borrower>;
  create(params: CreateBorrowerParams): Promise<Borrower>;
  update(id: string, params: UpdateBorrowerParams): Promise<Borrower>;
  delete(id: string): Promise<Borrower>;
}

export class BorrowersRestApi extends SystemApi<
  Borrower,
  CreateBorrowerParams,
  UpdateBorrowerParams,
  SearchBorrowersParams,
  ListBorrowersParams
> implements BorrowersApi {
  protected path = '/borrowers';
}
