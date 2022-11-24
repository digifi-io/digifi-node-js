import { SystemApi } from '../SystemApi';
import { BorrowerType } from '../../enums';
import { UserShort } from '../../types';

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

export enum ProductStatus {
  Archived = 'archived',
  Active = 'active',
  Draft = 'draft',
}

export enum AssigneeTeamMembersType {
  OnCreate = 'onCreate',
  RoundRobin = 'roundRobin',
  SpecificTeamMembers = 'specificTeamMembers',
}

export enum ApplicationFormPage {
  Borrower = 'borrower',
  CoBorrower = 'coBorrower',
  CoBorrower2 = 'coBorrower_2',
  CoBorrower3 = 'coBorrower_3',
  Intermediary = 'intermediary',
  ApplicationDetails = 'applicationDetails',
  DocumentUpload = 'documentUpload'
}

export interface ProductSettings {
  applicationFormPages: ApplicationFormPage[];
  assigneeTeamMembersType?: AssigneeTeamMembersType | null;
  teamMembersToAssign: string[];
  teamMembersToRoundRobin: string[];
  autoRejectionAfter?: number | null;
  autoRejectionDeclineReason?: string | null;
}

export interface Product {
  id: string;
  name: string;
  status: ProductStatus;
  type: ProductType;
  borrowerTypes: BorrowerType[];
  declineReasons: string[];
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: UserShort | null;
  createdBy?: UserShort | null;
  organization: string;
  settings: ProductSettings;
}

export interface CreateProductParams {
  name: string;
  borrowerTypes: BorrowerType[];
  type: ProductType;
  status: ProductStatus;
}

export interface UpdateProductParams {
  name?: string;
  borrowerTypes?: BorrowerType[];
  type?: ProductType;
  status?: ProductStatus;
  settings?: Partial<ProductSettings>;
  declineReasons?: string[];
}

export interface FindProductsParams {
  search?: string;
  teamMemberIds?: string[];
  statuses?: ProductStatus[];
  showArchived?: boolean;
  borrowerType?: BorrowerType;
  productType?: ProductType;
  dueCreatedDateRangeFrom?: string;
  dueCreatedDateRangeTo?: string;
  dueUpdatedDateRangeFrom?: string;
  dueUpdatedDateRangeTo?: string;
}

export default class ProductsApi extends SystemApi<
  Product,
  CreateProductParams,
  UpdateProductParams,
  FindProductsParams
> {
  protected basePath = 'products';
  protected entityKey = 'product';

  public async find(params: FindProductsParams): Promise<Product[]> {
    const products = await super.find(params);

    return products as Product[];
  }
}
