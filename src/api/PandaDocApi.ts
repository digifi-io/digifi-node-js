import { IApiClient } from '../clients';

export interface PandaDocConnectionStatus {
  connected: boolean;
}

export interface ICreateEmbeddedSigningDataParams {
  contactEmail: string;
  applicationId: string;
}

type ICreateEmbeddedSigningDataResponse = {
  sessionId?: string;
  waitingForOthers?: boolean;
}

export interface PandaDocApi {
  getConnectionStatus(): Promise<PandaDocConnectionStatus>;
  createEmbeddedSigningData(params: ICreateEmbeddedSigningDataParams): Promise<ICreateEmbeddedSigningDataResponse>;
}

export class PandaDocRestApi implements PandaDocApi {
  protected path = '/panda-doc'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public getConnectionStatus(): Promise<PandaDocConnectionStatus> {
    return this.apiClient.makeCall(`${this.path}/status`);
  }

  public createEmbeddedSigningData(params: ICreateEmbeddedSigningDataParams): Promise<ICreateEmbeddedSigningDataResponse> {
    return this.apiClient.makeCall(`${this.path}/embedded-signing-data`, 'POST', params);
  }
}
