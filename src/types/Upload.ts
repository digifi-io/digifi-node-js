import { IFinalizeUploadItem, IUploadItem } from '../types/UploadItem';
import { UploadEntityType } from '../enums/UploadEntityType';
import { UploadMetadataMapping } from '../types/UploadMetadata';

interface IUploadContext<EntityType extends UploadEntityType = UploadEntityType> {
  entityId?: string;
  entityType: EntityType;
}

export interface IPrepareUploadParams<EntityType extends UploadEntityType = UploadEntityType> {
  context: IUploadContext<EntityType>;
  items: IUploadItem<UploadMetadataMapping[EntityType]>[];
}

export interface IFinalizeUploadParams<EntityType extends UploadEntityType = UploadEntityType> {
  context: IUploadContext<EntityType>;
  items: IFinalizeUploadItem<UploadMetadataMapping[EntityType]>[];
}

export interface IUploadFinalizationResultItem {
  key: string;
  id: string;
}

export interface IUploadFinalizationResult {
  items: IUploadFinalizationResultItem[];
}
