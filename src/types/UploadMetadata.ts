import { UploadEntityType } from '../enums/UploadEntityType';
import { ApplicationDocumentAccessPermission } from '../api';

export interface IApplicationDocumentUploadMetadata {
  fileName: string;
  fileSize: number;
  fileType: string;
  parentId?: string;
  anchorId?: string;
  taskId?: string;
  accessPermissions?: ApplicationDocumentAccessPermission[];
  labelIds?: string[];
}

export type UploadMetadataMapping = {
  [UploadEntityType.Application]: IApplicationDocumentUploadMetadata;
};
