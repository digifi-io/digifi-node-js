import { SystemApi } from './SystemApi';
import { BorrowerType } from './BorrowersApi';
import { UserShortInfo } from '../types';

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

export interface ProductSettings {
  applicationFormPages: string[];
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
  updatedBy?: UserShortInfo | null;
  createdBy?: UserShortInfo | null;
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
  settings: Partial<ProductSettings>;
  declineReasons?: string[];
}

export default class ProductsApi extends SystemApi<Product, CreateProductParams, UpdateProductParams> {
  protected basePath = 'products';
}
