import { PaginationParams } from '../../types';
import { SystemApi } from '../SystemApi';

export type ApplicationNote = {
  id: string;
  note: string;
  testing?: boolean;
  author?: {
    id: string;
    email: string;
    color: string;
    firstName: string | null;
    lastName: string | null;
    avatarId?: string;
  } | null; // null is a System API user
  updatedBy?: string | null;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  applicationId: string;
}

export interface CreateApplicationNoteParams {
  applicationId: string;
  note: string;
}

export interface UpdateApplicationNoteParams {
  note?: string;
}

export enum ApplicationNoteSortField {
  UpdatedAt = 'updatedAt',
  Note = 'note',
  CreatedBy = 'createdBy',
}

export interface FindApplicationNotesParams extends PaginationParams<ApplicationNoteSortField> {
  search?: string;
  applicationId: string;
}

export default class ApplicationNotesApi extends SystemApi<
  ApplicationNote,
  CreateApplicationNoteParams,
  UpdateApplicationNoteParams,
  FindApplicationNotesParams
> {
  protected path = 'application-notes';
}
