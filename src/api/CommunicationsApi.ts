import { SystemApi } from './base/SystemApi';
import { PaginationParams, PaginationResult, AnyObject } from '../types';

export enum CommunicationType {
  Email = 'email',
  TextMessage = 'text-message',
  PhoneCall = 'phone-call',
}

export enum CommunicationContentBodyType {
  Text = 'text',
  Html = 'html',
  JsonMarkdown = 'json-markdown',
}

export enum CommunicationDeliveryStatus {
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum CommunicationSortField {
  Date = 'date',
  From = 'from',
  To = 'to',
  Subject = 'subject',
}

export interface CommunicationContentTextBody {
  type: CommunicationContentBodyType.Text;
  text: string;
}

export interface CommunicationContentJsonMarkdownBody {
  type: CommunicationContentBodyType.JsonMarkdown;
  textSource: AnyObject;
  text: string;
}

export interface CommunicationContentHtmlBody {
  type: CommunicationContentBodyType.Html;
}

export type CommunicationContentTextBodyInput = CommunicationContentTextBody;
export type CommunicationContentJsonMarkdownBodyInput = Omit<CommunicationContentJsonMarkdownBody, 'text'>;
export type CommunicationContentHtmlBodyInput = CommunicationContentHtmlBody & { html: string };

export type EmailCommunicationContentBody =
  | CommunicationContentTextBody
  | CommunicationContentJsonMarkdownBody
  | CommunicationContentHtmlBody;

export type EmailCommunicationContentBodyInput =
  | CommunicationContentTextBodyInput
  | CommunicationContentJsonMarkdownBodyInput
  | CommunicationContentHtmlBodyInput;

export type PhoneCallCommunicationContentBody =
  | CommunicationContentTextBody
  | CommunicationContentJsonMarkdownBody;

export type PhoneCallCommunicationContentBodyInput =
  | CommunicationContentTextBodyInput
  | CommunicationContentJsonMarkdownBodyInput;

export type TextMessageCommunicationContentBody =
  | CommunicationContentTextBody;

export type TextMessageCommunicationContentBodyInput =
  | CommunicationContentTextBodyInput;

interface BaseCommunication {
  id: string;
  productId: string;
  organizationId: string;
  applicationId: string;
  applicationDisplayId: string;
  borrowerIds: string[] | null;
  intermediaryId: string | null;
  type: CommunicationType;
  deliveryStatus: CommunicationDeliveryStatus;
  testing: boolean;
  recordDate: Date;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
}

export interface EmailCommunicationContent {
  to: string[];
  cc: string[];
  bcc: string[];
  from: string;
  subject: string;
  body: EmailCommunicationContentBody;
}

export interface TextMessageCommunicationContent {
  to: string;
  from: string;
  body: TextMessageCommunicationContentBody;
}

export interface PhoneCallCommunicationContent {
  to: string;
  from: string;
  body: PhoneCallCommunicationContentBody;
}

export interface EmailCommunication extends BaseCommunication {
  type: CommunicationType.Email;
  content: EmailCommunicationContent;
}

export interface TextMessageCommunication extends BaseCommunication {
  type: CommunicationType.TextMessage;
  content: TextMessageCommunicationContent;
}

export interface PhoneCallCommunication extends BaseCommunication {
  type: CommunicationType.PhoneCall;
  content: PhoneCallCommunicationContent;
}

export type Communication = EmailCommunication | TextMessageCommunication | PhoneCallCommunication;

export interface EmailCommunicationContentInput {
  to: string[];
  cc: string[];
  bcc: string[];
  from: string;
  subject?: string;
  body: EmailCommunicationContentBodyInput
}

export interface TextMessageCommunicationContentInput {
  to: string;
  from: string;
  body: TextMessageCommunicationContentBodyInput;
}

export interface PhoneCallCommunicationContentInput {
  to: string;
  from: string;
  body: PhoneCallCommunicationContentBodyInput;
}

export type AnyCommunicationContentInput =
  | EmailCommunicationContentInput
  | TextMessageCommunicationContentInput
  | PhoneCallCommunicationContentInput;

export interface BaseCreateCommunicationParams {
  applicationId: string;
  type: CommunicationType;
  content: unknown;
  borrowerIds?: string[] | null;
  intermediaryId?: string | null;
  recordDate: Date;
}

export interface CreateEmailCommunicationParams extends BaseCreateCommunicationParams{
  type: CommunicationType.Email;
  content: EmailCommunicationContentInput;
}

export interface CreateTextMessageCommunicationParams extends BaseCreateCommunicationParams {
  type: CommunicationType.Email;
  content: TextMessageCommunicationContentInput;
}

export interface CreatePhoneCallCommunicationParams extends BaseCreateCommunicationParams {
  type: CommunicationType.Email;
  content: PhoneCallCommunicationContentInput;
}

export type CreateCommunicationParams =
  | CreateEmailCommunicationParams
  | CreateTextMessageCommunicationParams
  | CreatePhoneCallCommunicationParams;

export interface BaseUpdateCommunicationParams {
  borrowerIds?: string[] | null;
  intermediaryId?: string | null;
  recordDate?: Date;
}

export interface WithContentUpdateCommunicationParams extends BaseUpdateCommunicationParams {
  contentPatchCommunicationType: CommunicationType;
  content: AnyCommunicationContentInput;
}

export interface WithoutContentUpdateCommunicationParams extends BaseUpdateCommunicationParams {
  content?: undefined;
  contentPatchCommunicationType?: undefined;
}

export type UpdateCommunicationParams = WithContentUpdateCommunicationParams | WithoutContentUpdateCommunicationParams;

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
