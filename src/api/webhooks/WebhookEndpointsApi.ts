import { SystemApi } from '../SystemApi';
import { OrganizationMode, PaginationParams, PaginationResult, UserShortInfo } from '../../types';

export interface WebhookEndpoint {
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

export interface CreateWebhookEndpointParams {
  url: string;
  events: string[];
  active: boolean;
  description?: string;
  mode?: OrganizationMode | null;
}

export interface UpdateWebhookEndpointParams {
  url?: string;
  events?: string[];
  active?: boolean;
  description?: string;
  mode?: OrganizationMode | null;
}

export enum WebhookEndpointSortingField {
  Url = 'url',
  Description = 'description',
  DataSource = 'dataSource',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}

export interface FindWebhookEndpointsParams extends PaginationParams<WebhookEndpointSortingField> {
  events?: string[];
  active?: boolean;
  mode?: Array<OrganizationMode | null>;
}

export default class WebhookEndpointsApi extends SystemApi<
  WebhookEndpoint,
  CreateWebhookEndpointParams,
  UpdateWebhookEndpointParams,
  FindWebhookEndpointsParams
> {
  protected path = 'webhook-endpoints';

  public async find(params: FindWebhookEndpointsParams): Promise<PaginationResult<WebhookEndpoint>> {
    const webhookEndpoints = await super.find(params);

    return webhookEndpoints as PaginationResult<WebhookEndpoint>;
  }
}
