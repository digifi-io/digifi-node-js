export type ResourceMetadataValue = string | number | boolean;
export type ResourceMetadata = Record<string, ResourceMetadataValue>;
export type ResourceMetadataPatch = Record<string, ResourceMetadataValue | null>;

export interface WithResourceMetadata {
  metadata: ResourceMetadata;
}

export interface WithOptionalResourceMetadata {
  metadata?: ResourceMetadata;
}

export interface WithResourceMetadataPatch {
  metadata?: ResourceMetadataPatch | null;
}
