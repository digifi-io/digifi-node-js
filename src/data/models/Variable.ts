export enum StringVisualDataType {
  List = 'List',
  Text = 'Text',
  LargeText = 'LargeText',
  PhoneNumber = 'PhoneNumber',
  EmailAddress = 'EmailAddress',
  IdentificationNumber = 'IdentificationNumber',
}

export enum DateVisualDataType {
  Date = 'Date',
}

export enum NumericVisualDataType {
  Number = 'Number',
  Monetary = 'Monetary',
  Percentage = 'Percentage',
}

export enum BooleanVisualDataType {
  Boolean = 'Boolean',
}

export enum AddressVisualDataType {
  Address = 'Address',
}

export type VisualDataType =
  | NumericVisualDataType
  | StringVisualDataType
  | BooleanVisualDataType
  | DateVisualDataType
  | AddressVisualDataType;