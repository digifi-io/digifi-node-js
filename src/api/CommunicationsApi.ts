import { SystemApi } from './base/SystemApi';
import { PaginationParams, PaginationResult, UserBasic } from '../types';

export enum CommunicationType {
  Email = 'Email',
  TextMessage = 'TextMessage',
  PhoneCall = 'PhoneCall',
}

export enum CommunicationMessageStatus {
  Queued = 'queued',
  Sent = 'sent',
  SentManually = 'sentManually',
}

export enum CommunicationSortField {
  Date = 'date',
  From = 'from',
  To = 'to',
  Subject = 'subject',
}

interface BaseCommunication {
  id: string;
  productId: string;
  organizationId: string;
  applicationId: string;
  applicationDisplayId: string;
  borrowerIds: string[] | null;
  intermediaryId: string | null;
  communicationType: CommunicationType;
  messageStatus: CommunicationMessageStatus;
  testing: boolean;
  recordDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: UserBasic | null;
  updatedBy?: string;
}

export interface EmailCommunicationContent {
  to: string[];
  cc: string[];
  bcc: string[];
  from: string;
  subject: string;
  body?: string | null;
  attachmentsCount?: number;
}

export interface TextMessageCommunicationContent {
  to: string;
  from: string;
  message: string;
}

export interface PhoneCallCommunicationContent {
  to: string;
  from: string;
  message?: string | null;
}

export interface EmailCommunication extends BaseCommunication {
  communicationType: CommunicationType.Email;
  content: EmailCommunicationContent;
}

export interface TextMessageCommunication extends BaseCommunication {
  communicationType: CommunicationType.TextMessage;
  content: TextMessageCommunicationContent;
}

export interface PhoneCallCommunication extends BaseCommunication {
  communicationType: CommunicationType.PhoneCall;
  content: PhoneCallCommunicationContent;
}

export type Communication = EmailCommunication | TextMessageCommunication | PhoneCallCommunication;

export interface CreateEmailCommunicationContentParams {
  to: string[];
  cc: string[];
  bcc: string[];
  from: string;
  subject?: string;
  body?: string | null;
  bodyHtml?: string | null;
  attachmentsCount?: number;
  organizationId: string;
}

export interface CreateTextMessageCommunicationContentParams {
  to: string;
  from: string;
  message: string;
}

export interface CreatePhoneCallCommunicationContentParams {
  to: string;
  from: string;
  message?: string | null;
}

export type CreateCommunicationContentParams =
  | CreateEmailCommunicationContentParams
  | CreateTextMessageCommunicationContentParams
  | CreatePhoneCallCommunicationContentParams;

export interface CreateCommunicationParams {
  applicationId: string;
  communicationType: CommunicationType;
  content: CreateCommunicationContentParams;
  borrowerIds?: string[] | null;
  intermediaryId?: string | null;
  recordDate: Date;
}

export interface UpdateCommunicationParams {
  content?: Partial<CreateCommunicationContentParams>;
  borrowerIds?: string[] | null;
  intermediaryId?: string | null;
  recordDate?: Date;
}

export interface SearchCommunicationsParams extends PaginationParams<CommunicationSortField> {
  communicationType?: CommunicationType[];
  applicationId?: string;
  productId?: string;
  id?: string;
  borrowerIds?: string[];
  intermediaryId?: string;
  recordDateFrom?: string;
  recordDateTo?: string;
  createdBy?: string[];
}

export interface CommunicationsApi {
  search(params: SearchCommunicationsParams): Promise<PaginationResult<Communication>>;
  findById(id: string): Promise<Communication | null>;
  create(params: CreateCommunicationParams): Promise<Communication>;
  update(id: string, params: UpdateCommunicationParams): Promise<Communication>;
  delete(id: string): Promise<Communication>;
}

export class CommunicationsRestApi extends SystemApi<
  Communication,
  CreateCommunicationParams,
  UpdateCommunicationParams,
  SearchCommunicationsParams
> implements CommunicationsApi {
  protected path = '/communications';
}
