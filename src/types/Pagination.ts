import { SortDirection } from '../enums';

export interface PaginationLimitParams {
  offset?: number;
  count?: number;
}

interface PaginationParams<SortField> extends PaginationLimitParams {
  search?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
}

export interface PaginationResult<Item> {
  total: number;
  items: Item[];
}

export default PaginationParams;
