export enum AddressValueKey {
  StreetName = 'street_name',
  StreetNumber = 'street_number',
  UnitNumber = 'unit_number',
  Sublocality = 'sublocality',
  City = 'city',
  StateOrProvince = 'state_or_province',
  ZipOrPostalCode = 'zip_or_postal_code',
  Country = 'country',
}

export interface AddressValue {
  [AddressValueKey.StreetNumber]?: string;
  [AddressValueKey.StreetName]?: string;
  [AddressValueKey.UnitNumber]?: string;
  [AddressValueKey.Sublocality]?: string;
  [AddressValueKey.City]?: string;
  [AddressValueKey.StateOrProvince]?: string;
  [AddressValueKey.ZipOrPostalCode]?: string;
  [AddressValueKey.Country]?: string;
}

export type TableRowValue = Record<string, BasicVariableValue> & {
  _id: string;
};
export type TableValue = TableRowValue[];


export type BasicVariableValue = number | string | boolean | AddressValue | null | undefined;
export type ComplexVariableValue = TableValue;
export type VariableValue = BasicVariableValue | ComplexVariableValue;
