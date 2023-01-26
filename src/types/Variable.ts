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
