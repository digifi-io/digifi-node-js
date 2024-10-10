import { BorrowerType } from '../enums';
import { UserShort } from '../types';
import getSearchParams from '../utils/getSearchParams';
import { SearchParams } from './base';
import { IApiClient } from '../clients';

export enum ProductType {
  Custom = 'custom',
  CreditCard = 'creditCard',
  PersonalLoan = 'personalLoan',
  AutoLoanRefinancing = 'autoLoanRefinancing',
  Mortgage = 'mortgage',
  HomeEquityLoan = 'homeEquityLoan',
  HomeImprovementLoan = 'homeImprovementLoan',
  PointOfSaleFinancing = 'pointOfSaleFinancing',
  SmallBusinessLoan = 'smallBusinessLoan',
  CommercialLoan = 'commercialLoan',
}

export enum AssigneeTeamMembersType {
  OnCreate = 'onCreate',
  RoundRobin = 'roundRobin',
  SpecificTeamMembers = 'specificTeamMembers',
}

export enum ApplicationFormPageType {
  Borrower = 'borrower',
  CoBorrower = 'coBorrower',
  CoBorrower2 = 'coBorrower_2',
  CoBorrower3 = 'coBorrower_3',
  Intermediary = 'intermediary',
  ApplicationDetails = 'applicationDetails',
  DocumentUpload = 'documentUpload'
}


export enum ApplicationFormPageBehavior {
  Required = 'required',
  Optional = 'optional',
}

export type ApplicationFormPages = Partial<Record<ApplicationFormPageType, ApplicationFormPageBehavior>>;

export interface ProductSettings {
  applicationFormPages: ApplicationFormPages;
  assigneeTeamMembersType?: AssigneeTeamMembersType | null;
  teamMembersToAssign: string[];
  teamMembersToRoundRobin: string[];
  autoRejectionAfter?: number | null;
  autoRejectionDeclineReason?: string | null;
}

export interface Product {
  id: string;
  name: string;
  isArchived?: boolean;
  type: ProductType;
  borrowerTypes: BorrowerType[];
  declineReasons: string[];
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  organizationVersion: number;
  settings: ProductSettings;
  updatedBy?: UserShort | null;
  createdBy?: UserShort | null;
}

export interface FindProductsParams {
  search?: string;
  teamMemberIds?: string[];
  excludeArchived?: boolean;
  borrowerType?: BorrowerType;
  productType?: ProductType;
  dueCreatedDateRangeFrom?: string;
  dueCreatedDateRangeTo?: string;
  dueUpdatedDateRangeFrom?: string;
  dueUpdatedDateRangeTo?: string;
  autoRejectionSet?: boolean;
  offset?: number;
  count?: number;
}

export interface ProductsApi {
  find(params: FindProductsParams): Promise<Product[]>;
  findById(id: string): Promise<Product>;
}

export class ProductsRestApi implements ProductsApi {
  protected path = '/products';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public async find(params: FindProductsParams): Promise<Product[]> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    const products = await this.apiClient.makeCall<Product[]>(`${this.path}?${urlSearchParams}`);

    return products as Product[];
  }

  public findById(id: string): Promise<Product> {
    return this.apiClient.makeCall<Product>(`${this.path}/${id}`);
  }
}
