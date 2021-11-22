import { SystemApi } from './SystemApi';

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  description: string;
  organization: string;
}

export interface CreateWebhookParams {
  url: string;
  events: string[];
  active: boolean;
  description?: string;
}

export interface UpdateWebhookParams {
  url?: string;
  events?: string[];
  active?: boolean;
  description?: string;
}

export default class WebhooksApi extends SystemApi<Webhook, CreateWebhookParams, UpdateWebhookParams> {
  protected basePath = 'webhooks';
}
