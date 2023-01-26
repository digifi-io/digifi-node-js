import { SystemApi } from '../SystemApi';
import { VariableValue, UserShort, SearchHighlight, PaginationResult, PaginationParams } from '../../types';
import { BorrowerType } from '../../enums';

export enum BorrowerDefaultValue {
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

export enum BorrowerSortField {
  FullName = 'fullName',
  IdNumber = 'idNumber',
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  UpdatedAt = 'updatedAt',
  CreatedAt = 'createdAt',
  SearchRelevance = 'searchRelevance',
}

export interface FindBorrowersParams extends PaginationParams<BorrowerSortField>{
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

export default class BorrowersApi extends SystemApi<
  Borrower,
  CreateBorrowerParams,
  UpdateBorrowerParams,
  FindBorrowersParams
> {
  protected path = 'borrowers';

  public async find(params: FindBorrowersParams): Promise<PaginationResult<Borrower>> {
    const borrowers = await super.find(params);

    return borrowers as PaginationResult<Borrower>;
  }
}
