import { IApiClient } from '../clients';

export interface GoogleAnalyticsIntegrationSettings {
  measurementId: string;
}

export interface GetGoogleAnalyticsIntegrationSettingsResponse {
  settings: GoogleAnalyticsIntegrationSettings | null;
}

export interface GoogleAnalyticsApi {
  getIntegrationSettings(): Promise<GetGoogleAnalyticsIntegrationSettingsResponse>;
}

export class GoogleAnalyticsRestApi implements GoogleAnalyticsApi {
  protected path = '/google-analytics'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getIntegrationSettings(): Promise<GetGoogleAnalyticsIntegrationSettingsResponse> {
    return this.apiClient.makeCall(`${this.path}/integrations/settings`);
  }
}
