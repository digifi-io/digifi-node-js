import { ImageParams } from '../data/models';

enum AccountNotificationType {
  ApplicationCreated = 'applicationCreated',
  ApplicationStatusChanged = 'applicationStatusChanged',
  ApplicationNoteCreated = 'applicationNoteCreated',
  ApplicationDocumentUploaded = 'applicationDocumentUploaded',
  ApplicationTaskCreated = 'applicationTaskCreated',
  ApplicationTaskStatusChange = 'applicationTaskStatusChange',
  ApplicationTaskCommentAdded = 'applicationTaskCommentAdded',
  WebhookEndpointNotResponding = 'webhookEndpointNotResponding',
}

export interface UserBasic {
  id: string;
  firstName: string;
  lastName: string;
  avatarId?: string;
}

export interface UserShort extends UserBasic {
  email?: string;
  phone?: string | null;
  isMfaEnabled?: boolean;
  isEmailVerified?: boolean;
  avatarParams?: ImageParams;
  notificationBlacklist: AccountNotificationType[];
}

export interface UserShortInfo {
  firstName: string;
  lastName: string;
  avatarId?: string;
  id: string;
}

export default UserShort;
