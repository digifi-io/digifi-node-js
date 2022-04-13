export type VariableValue = string | boolean | number | null;

export enum UserRole {
  Owner = 'owner',
  Admin = 'admin',
  User = 'user',
}

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

export interface AuthResponseParams {
  accessToken: string;
  refreshToken: string;
}
