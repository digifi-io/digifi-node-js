import { IApiClient } from '../clients';
import { PermissionGroupId } from '../types';

export interface PermissionGroup {
  id: PermissionGroupId;
  name: string;
}

export interface PermissionGroupsApi {
  findById(id: PermissionGroupId): Promise<PermissionGroup>;
}

export class PermissionGroupsRestApi implements PermissionGroupsApi {
  protected path = '/permission-groups';

  constructor(
    private apiClient: IApiClient,
  ) {}

  public findById(id: PermissionGroupId): Promise<PermissionGroup> {
    return this.apiClient.makeCall<PermissionGroup>(`${this.path}/${id}`);
  }
}
