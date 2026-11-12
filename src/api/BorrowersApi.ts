import { SystemApi } from './base/SystemApi';
import { SearchParams } from './base';
import {
  VariableValue,
  UserShort,
  UserBasic,
  SearchHighlight,
  PaginationParams,
  PaginationResult,
  PaginationLimitParams,
} from '../types';
import { BorrowerType, SortDirection } from '../enums';
import getSearchParams from '../utils/getSearchParams';
import { CursorPaginationParams, CursorPaginationResult } from '../types/Pagination';
import {
  WithOptionalResourceMetadata,
  WithResourceMetadata,
  WithResourceMetadataPatch,
} from '../types/ResourceMetadata';

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

export enum BorrowerConsentType {
  SmsTransactional = 'smsTransactional',
  EmailTransactional = 'emailTransactional',
  EmailMarketing = 'emailMarketing',
}

export interface BorrowerConsents {
  smsTransactional: boolean;
  emailTransactional: boolean;
  emailMarketing: boolean;
}

export interface Borrower extends WithResourceMetadata {
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
  consents: BorrowerConsents;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  createdAt: Date;
  updatedAt: Date;
  highlights?: SearchHighlight[];
}

export interface CreateBorrowerParams extends WithOptionalResourceMetadata {
  type: BorrowerType;
  variables: Record<string, VariableValue>;
  lockEndDate?: string | null;
  lockReason?: string;
}

export interface UpdateBorrowerParams extends WithResourceMetadataPatch {
  type?: BorrowerType;
  variables?: Record<string, VariableValue>;
  lockEndDate?: string | null;
  lockReason?: string;
}

export interface BorrowerConsentChange {
  consentType: BorrowerConsentType;
  isActive: boolean;
  disclosureCopy?: string | null;
}

export interface ChangeBorrowerConsentsParams {
  changes: BorrowerConsentChange[];
  source: string;
  recordedBy: string;
  ipAddress?: string | null;
  device?: string | null;
}

export enum BorrowerConsentChangeType {
  OptedIn = 'optedIn',
  OptedOut = 'optedOut',
}

export enum BorrowerConsentChangeSource {
  Platform = 'platform',
  BorrowerPortalSignUp = 'borrowerPortalSignUp',
  BorrowerPortalMyAccount = 'borrowerPortalMyAccount',
  Api = 'api',
}

export type BorrowerPortalConsentType = BorrowerConsentType.SmsTransactional | BorrowerConsentType.EmailMarketing;

export type BorrowerPortalConsentChangeSource =
  | BorrowerConsentChangeSource.BorrowerPortalSignUp
  | BorrowerConsentChangeSource.BorrowerPortalMyAccount;

export interface BorrowerPortalConsentChange {
  consentType: BorrowerPortalConsentType;
  isActive: boolean;
  disclosureCopy?: string | null;
}

export interface ChangeBorrowerPortalConsentsParams {
  sourceType: BorrowerPortalConsentChangeSource;
  changes: BorrowerPortalConsentChange[];
  ipAddress: string;
  device: string;
}

export enum BorrowerConsentHistorySortField {
  CreatedAt = 'createdAt',
  ConsentType = 'consentType',
  ChangeType = 'changeType',
}

export interface BorrowerConsentHistoryRecord {
  id: string;
  organizationId: string;
  testing: boolean;
  borrowerId: string;
  consentType: BorrowerConsentType;
  changeType: BorrowerConsentChangeType;
  contact: string | null;
  sourceType: BorrowerConsentChangeSource;
  changeReason: string | null;
  createdBy: UserBasic | null;
  ipAddress: string | null;
  device: string | null;
  disclosureCopy: string | null;
  source: string | null;
  recordedBy: string | null;
  createdAt: Date;
}

/**
 * `count` is an integer from 1 to 100 (20 by default), `offset` an integer from 0.
 * The records are sorted by `createdAt` from the newest by default.
 */
export interface GetBorrowerConsentHistoryParams extends PaginationLimitParams {
  sortField?: BorrowerConsentHistorySortField;
  sortDirection?: SortDirection;
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
  changeConsents(id: string, params: ChangeBorrowerConsentsParams): Promise<Borrower>;
  changePortalConsents(id: string, params: ChangeBorrowerPortalConsentsParams): Promise<Borrower>;
  getConsentHistory(
    id: string,
    params?: GetBorrowerConsentHistoryParams,
  ): Promise<PaginationResult<BorrowerConsentHistoryRecord>>;
}

export class BorrowersRestApi extends SystemApi<
  Borrower,
  CreateBorrowerParams,
  UpdateBorrowerParams,
  SearchBorrowersParams,
  ListBorrowersParams
> implements BorrowersApi {
  protected path = '/borrowers';

  public changeConsents(id: string, params: ChangeBorrowerConsentsParams) {
    return this.apiClient.makeCall<Borrower>(`${this.path}/${id}/consents`, 'PUT', params);
  }

  public changePortalConsents(id: string, params: ChangeBorrowerPortalConsentsParams) {
    return this.apiClient.makeCall<Borrower>(`${this.path}/${id}/portal-consents`, 'PUT', params);
  }

  public getConsentHistory(id: string, params: GetBorrowerConsentHistoryParams = {}) {
    const urlSearchParams = getSearchParams(params as unknown as SearchParams);

    return this.apiClient.makeCall<PaginationResult<BorrowerConsentHistoryRecord>>(
      `${this.path}/${id}/consent-history?${urlSearchParams}`,
    );
  }
}
