import {
  IUploadFinalizationResult,
  IFinalizeUploadParams,
  IPreparedUploadItem,
  IPrepareUploadParams,
  UploadMetadataMapping,
} from '../types';
import { IApiClient } from '../clients';
import { UploadEntityType } from '../enums/UploadEntityType';

export interface UploadApi {
  prepare<
    EntityType extends UploadEntityType = UploadEntityType
  >(params: IPrepareUploadParams<EntityType>): Promise<IPreparedUploadItem<UploadMetadataMapping[EntityType]>[]>;
  finalize(params: IFinalizeUploadParams): Promise<IUploadFinalizationResult>;
}

export class UploadRestApi implements UploadApi {
  protected path = '/uploads'

  public constructor(
    private apiClient: IApiClient,
  ) {
  }

  public prepare<
    EntityType extends UploadEntityType = UploadEntityType
  >({ context, items }: IPrepareUploadParams<EntityType>): Promise<IPreparedUploadItem<UploadMetadataMapping[EntityType]>[]> {
    return this.apiClient.makeCall(`${this.path}/prepare`, 'POST', {
      context,
      items,
    });
  }

  public finalize({ context, items }: IFinalizeUploadParams): Promise<IUploadFinalizationResult> {
    return this.apiClient.makeCall(`${this.path}/finalize`, 'POST', {
      context,
      items,
    });
  }
}
