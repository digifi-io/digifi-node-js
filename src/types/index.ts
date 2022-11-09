export enum AddressValueKey {
  StreetName = 'street_name',
  StreetNumber = 'street_number',
  Sublocality = 'sublocality',
  City = 'city',
  StateOrProvince = 'state_or_province',
  ZipOrPostalCode = 'zip_or_postal_code',
  Country = 'country',
}

export interface AddressValue {
  [AddressValueKey.StreetNumber]?: string;
  [AddressValueKey.StreetName]?: string;
  [AddressValueKey.Sublocality]?: string;
  [AddressValueKey.City]?: string;
  [AddressValueKey.StateOrProvince]?: string;
  [AddressValueKey.ZipOrPostalCode]?: string;
  [AddressValueKey.Country]?: string;
}

export type VariableValue = number | string | boolean | AddressValue | null | undefined;

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

export type NumericDataType =
  | 'Number'
  | 'Monetary'
  | 'Percentage';

export type StringDataType =
  | 'List'
  | 'Text'
  | 'LargeText'
  | 'PhoneNumber'
  | 'EmailAddress'
  | 'IdentificationNumber';
