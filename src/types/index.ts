export type VariableValue = string | boolean | number | null;

export interface TableData<Item> {
  items: Item[];
  total: number;
}

export interface UserShortInfo {
  id: string;
  firstName: string;
  lastName: string;
  imageId?: string;
}
