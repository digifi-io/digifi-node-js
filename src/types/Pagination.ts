import { SortDirection } from '../enums';

interface PaginationParams<SortField> {
  offset?: number;
  count?: number;
  search?: string;
  sortField?: SortField;
  sortDirection?: SortDirection;
}

export interface PaginationResult<Item> {
  total: number;
  items: Item[];
}

export default PaginationParams;
