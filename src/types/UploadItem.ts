import { AnyObject } from '../types/AnyObject';

export type IUploadItem<Metadata = AnyObject> = {
  key: string;
  metadata: Metadata;
};

interface IUploadUrl {
  url: string;
  fields?: Record<string, string>;
  method: 'PUT' | 'POST';
}

export interface IPreparedUploadItem<
  Metadata extends AnyObject
> extends IUploadItem<Metadata> {
  itemId: string;
  uploadUrl: IUploadUrl;
}

export interface IFinalizeUploadItem<Metadata = AnyObject>  extends IUploadItem<Metadata> {
  itemId: string;
}
