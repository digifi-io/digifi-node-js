import { SystemApi } from '../SystemApi';
import { OrganizationMode, PaginationParams, PaginationResult, UserShortInfo } from '../../types';

enum BaseApplicationEventType {
  ApplicationCreated = 'application.created',
  ApplicationUpdated = 'application.updated',
  ApplicationDeleted = 'application.deleted',
}

enum ApplicationDecisionProcessingEventType {
  ApplicationDecisionProcessed = 'applicationDecisionProcessed',
}

enum BaseBorrowerEventType {
  BorrowerCreated = 'borrower.created',
  BorrowerUpdated = 'borrower.updated',
  BorrowerDeleted = 'borrower.deleted',
}

enum BaseNoteEventType {
  NoteCreated = 'note.created',
  NoteUpdated = 'note.updated',
  NoteDeleted = 'note.deleted',
}

enum BaseTaskEventType {
  TaskCreated = 'task.created',
  TaskUpdated = 'task.updated',
  TaskDeleted = 'task.deleted',
}

enum BaseApplicationDocumentEventType {
  ApplicationDocumentCreated = 'document.created',
  ApplicationDocumentUpdated = 'document.updated',
  ApplicationDocumentDeleted = 'document.deleted',
}

enum BaseIntermediaryEventType {
  IntermediaryCreated = 'intermediary.created',
  IntermediaryUpdated = 'intermediary.updated',
  IntermediaryDeleted = 'intermediary.deleted',
}

export type EventType =
  | BaseApplicationEventType
  | ApplicationDecisionProcessingEventType
  | BaseBorrowerEventType
  | BaseIntermediaryEventType
  | BaseNoteEventType
  | BaseTaskEventType
  | BaseApplicationDocumentEventType;


export interface Webhook {
  id: string;
  organizationId: string;
  url: string;
  events: EventType[];
  active: boolean;
  endpointSecret: string;
  mode: OrganizationMode | null;
  description?: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy?: UserShortInfo | null;
  createdBy?: UserShortInfo | null;
}

export interface CreateWebhookParams {
  url: string;
  events: string[];
  active: boolean;
  description?: string;
  mode?: OrganizationMode | null;
}

export interface UpdateWebhookParams {
  url?: string;
  events?: string[];
  active?: boolean;
  description?: string;
  mode?: OrganizationMode | null;
}

export enum WebhookSortingField {
  Url = 'url',
  Description = 'description',
  DataSource = 'dataSource',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}

export interface FindWebhooksParams extends PaginationParams<WebhookSortingField>{
  events?: EventType[];
  active?: boolean;
  mode?: Array<OrganizationMode | null>;
}

export default class WebhooksApi extends SystemApi<Webhook, CreateWebhookParams, UpdateWebhookParams, FindWebhooksParams> {
  protected basePath = 'webhooks';

  public async find(params: FindWebhooksParams): Promise<PaginationResult<Webhook>> {
    const webhooks = await super.find(params);

    return webhooks as PaginationResult<Webhook>;
  }
}
