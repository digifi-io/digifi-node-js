import { IApiClient } from '../clients';
import getSearchParams from '../utils/getSearchParams';
import { SearchParams } from './base';

export interface DocusignConnectionStatus {
  connected: boolean;
}

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

export interface ListEnvelopesParams {
  status?: string;
  searchText?: string;
  fromDate?: string;
  toDate?: string;
  orderBy?: string;
  order?: string;
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

/**
 * @deprecated Will be removed in next major release.
 */
export interface DocuSignIntegrationSettings {
  environment: DocuSignEnvironmentType;
  clientId: string;
}

/**
 * @deprecated Will be removed in next major release.
 */
export interface GetDocuSignIntegrationSettingsResponse {
  settings: DocuSignIntegrationSettings | null;
}

export interface CreateEmbeddedSigningDataParams {
  signerEmail: string;
  applicationId: string;
  recipientEntityType: string;
  returnUrl: string;
}

export interface EmbeddedSigningData {
  embeddedSigningUrl?: string | null;
  clientId?: string;
  environment?: DocuSignEnvironmentType;
  waitingForOthers?: boolean;
}

export interface DocuSignApi {
  /**
   * @deprecated Will be removed in next major release. (use `getConnectionStatus` instead)
   */
  getIntegrationSettings(): Promise<GetDocuSignIntegrationSettingsResponse>;
  getConnectionStatus(): Promise<DocusignConnectionStatus>;
  listEnvelopes(params: ListEnvelopesParams): Promise<ListEnvelopesResponse>;
  createRecipientsView(params: CreateRecipientViewParams): Promise<DocuSignViewUrl>;
  createEmbeddedSigningData(params: CreateEmbeddedSigningDataParams): Promise<EmbeddedSigningData>;
}

export class DocuSignRestApi implements DocuSignApi {
  protected path = '/docusign'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getConnectionStatus(): Promise<DocusignConnectionStatus> {
    return this.apiClient.makeCall(`${this.path}/status`);
  }

  public createEmbeddedSigningData(params: CreateEmbeddedSigningDataParams): Promise<EmbeddedSigningData> {
    return this.apiClient.makeCall(`${this.path}/embedded-signing-data`, 'POST', params);
  }

  /**
   * @deprecated Will be removed in next major release. (use `getConnectionStatus` instead)
   */
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
