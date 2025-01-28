import { IApiClient } from '../clients';
import getSearchParams from '../utils/getSearchParams';
import { SearchParams } from './base';

export interface DocuSignViewUrl {
  url?: string;
}

export interface DocuSignSigner {
  clientUserId?: string;
  email?: string;
  embeddedRecipientStartURL?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  recipientId?: string;
  recipientIdGuid?: string;
  recipientType?: string;
  status?: string;
  userId?: string;
}

export interface DocuSignEnvelopeRecipient {
  signers?: DocuSignSigner[];
}

export interface DocuSignEnvelope {
  envelopeId?: string;
  status?: string;
  recipients?: DocuSignEnvelopeRecipient;
}

export interface ListEnvelopesResponse {
  envelopes: DocuSignEnvelope[] | null;
}

export enum ESignTemplateRecipientEntityType {
  Borrower = 'Borrower',
  CoBorrower = 'Co-Borrower',
  Intermediary = 'Intermediary',
  Other = 'Other',
}

export interface ListEnvelopesParams {
  status?: string;
  searchText?: string;
  fromDate?: string;
  toDate?: string;
  orderBy?: string;
  order?: string;
  applicationId?: string;
  recipientType?: ESignTemplateRecipientEntityType;
}

export interface CreateRecipientViewParams {
  envelopeId: string;
  userId: string;
  returnUrl: string;
}

export enum DocuSignEnvironmentType {
  Development = 'development',
  Production = 'production',
}

export interface DocuSignIntegrationSettings {
  environment: DocuSignEnvironmentType;
  clientId: string;
}

export interface GetDocuSignIntegrationSettingsResponse {
  settings: DocuSignIntegrationSettings | null;
}

export interface DocuSignApi {
  getIntegrationSettings(): Promise<GetDocuSignIntegrationSettingsResponse>;
  listEnvelopes(params: ListEnvelopesParams): Promise<ListEnvelopesResponse>;
  createRecipientsView(params: CreateRecipientViewParams): Promise<DocuSignViewUrl>;
}

export class DocuSignRestApi implements DocuSignApi {
  protected path = '/docusign'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getIntegrationSettings(): Promise<GetDocuSignIntegrationSettingsResponse> {
    return this.apiClient.makeCall(`${this.path}/integrations/settings`);
  }

  public listEnvelopes(params: ListEnvelopesParams): Promise<ListEnvelopesResponse> {
    const urlSearchParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall(`${this.path}/envelopes/list?${urlSearchParams}`);
  }

  public createRecipientsView(params: CreateRecipientViewParams): Promise<DocuSignViewUrl> {
    return this.apiClient.makeCall(`${this.path}/envelopes/views/recipient`, 'POST', params);
  }
}
