import { SortDirection } from '../enums';

export interface CursorPaginationParams {
  count?: number;
  nextToken?: string;
}

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

export interface CursorPaginationResult<Item> extends Omit<PaginationResult<Item>, 'total'> {
  nextToken?: string;
}

export default PaginationParams;
