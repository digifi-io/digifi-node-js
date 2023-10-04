import { SystemApi } from '../SystemApi';
import { OrganizationMode, PaginationParams, PaginationResult, UserShortInfo } from '../../types';

/**
 * @deprecated Use WebhookEndpoint instead.
 */
export interface Webhook {
  id: string;
  organizationId: string;
  url: string;
  events: string[];
  active: boolean;
  endpointSecret: string;
  mode: OrganizationMode | null;
  description?: string;
  updatedAt: Date;
  createdAt: Date;
  updatedBy?: UserShortInfo | null;
  createdBy?: UserShortInfo | null;
}

/**
 * @deprecated Use CreateWebhookEndpointParams instead.
 */
export interface CreateWebhookParams {
  url: string;
  events: string[];
  active: boolean;
  description?: string;
  mode?: OrganizationMode | null;
}

/**
 * @deprecated Use UpdateWebhookEndpointParams instead.
 */
export interface UpdateWebhookParams {
  url?: string;
  events?: string[];
  active?: boolean;
  description?: string;
  mode?: OrganizationMode | null;
}

/**
 * @deprecated Use WebhookEndpointSortingField instead.
 */
export enum WebhookSortingField {
  Url = 'url',
  Description = 'description',
  DataSource = 'dataSource',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}

/**
 * @deprecated Use FindWebhookEndpointsParams instead.
 */
export interface FindWebhooksParams extends PaginationParams<WebhookSortingField> {
  events?: string[];
  active?: boolean;
  mode?: Array<OrganizationMode | null>;
}

/**
 * @deprecated Use WebhookEndpointsApi instead.
 */
export default class WebhooksApi extends SystemApi<Webhook, CreateWebhookParams, UpdateWebhookParams, FindWebhooksParams> {
  protected path = 'webhooks';

  public async find(params: FindWebhooksParams): Promise<PaginationResult<Webhook>> {
    const webhooks = await super.find(params);

    return webhooks as PaginationResult<Webhook>;
  }
}
