import { SystemApi } from './SystemApi';
import { VariableValue, UserShortInfo } from '../types';

export enum BorrowerType {
  Person = 'person',
  Company = 'company'
}

export enum BorrowerDefaultValue {
  FirstName = 'borrower_first_name',
  LastName = 'borrower_last_name',
  PersonalIdNumber = 'borrower_personal_id_number',
  DateOfBirth = 'borrower_date_of_birth',
  CompanyName = 'borrower_company_name',
  CompanyIdNumber = 'borrower_company_id_number',
  Email = 'borrower_email',
  PhoneNumber = 'borrower_phone',
  Street = 'borrower_street_address',
  City = 'borrower_city',
  State = 'borrower_state_or_province',
  Zip = 'borrower_zip_or_postal_code',
  Country = 'borrower_country',
}

export interface Borrower {
  id: string;
  type: BorrowerType;
  organizationId: string;
  variables: {
    [key: string]: VariableValue;
  };
  locked: boolean;
  createdBy?: UserShortInfo | null;
  updatedBy?: UserShortInfo | null;
  createdAt: Date;
  updatedAt: Date;
}

interface BaseCreateBorrowerParams {
  locked?: boolean;
}

interface PersonVariables extends Record<string, VariableValue> {
  [BorrowerDefaultValue.FirstName]: string;
  [BorrowerDefaultValue.LastName]: string;
}

interface CompanyVariables extends Record<string, VariableValue> {
  [BorrowerDefaultValue.CompanyName]: string;
}

interface CreatePersonBorrowerParams extends BaseCreateBorrowerParams {
  type: BorrowerType.Person;
  variables: PersonVariables;
}

interface CreateCompanyBorrowerParams extends BaseCreateBorrowerParams {
  type: BorrowerType.Company;
  variables: CompanyVariables;
}

export type CreateBorrowerParams = CreatePersonBorrowerParams | CreateCompanyBorrowerParams;

interface UpdateBorrowerParams {
  variables?: Partial<PersonVariables> | Partial<CompanyVariables>;
  locked?: boolean;
}

export default class BorrowersApi extends SystemApi<Borrower, CreateBorrowerParams, UpdateBorrowerParams> {
  protected basePath = 'borrowers';
  protected entityKey = 'borrower';
}
