import { IApiClient } from '../../clients';
import { PaginationParams, PaginationResult, PermissionGroupId } from '../../types';
import getSearchParams from '../../utils/getSearchParams';
import { UserSortField } from '../../enums';
import { SearchParams } from '../BaseSystemApi';

export interface FindUserParams extends PaginationParams<UserSortField> {
  ids?: string[];
  permissionGroupName?: string;
  permissionGroupId?: PermissionGroupId;
  phoneAuthentication?: boolean;
  showInactive?: boolean;
  isUserActive?: boolean;
  email?: string;
  emails?: string[];
}

export interface User {
  userId?: string;
  membershipId: string;
  email: string;
  permissionGroupId: PermissionGroupId;
  permissionGroupName: string;
  isOwner: boolean;
  firstName?: string;
  lastName?: string;
  isMfaEnabled?: boolean;
  isActive: boolean;
  avatarId?: string;
  lastActiveAt?: Date;
}

class UsersApi {
  protected path = '/users'

  constructor(
    private apiClient: IApiClient,
  ) {}

  public find(params: FindUserParams): Promise<PaginationResult<User>> {
    const searchParams = getSearchParams(params as SearchParams);

    return this.apiClient.makeCall(`${this.path}?${searchParams}`);
  }
}

export default UsersApi;
