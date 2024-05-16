import { PaginationParams, PaginationResult } from '../types';
import { SystemApi } from './base/SystemApi';

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

export interface ApplicationNotesApi {
  search(params: FindApplicationNotesParams): Promise<PaginationResult<ApplicationNote>>;
  findById(id: string): Promise<ApplicationNote>;
  create(params: CreateApplicationNoteParams): Promise<ApplicationNote>;
  update(id: string, params: UpdateApplicationNoteParams): Promise<ApplicationNote>;
  delete(id: string): Promise<ApplicationNote>;
}

export class ApplicationNotesRestApi extends SystemApi<
  ApplicationNote,
  CreateApplicationNoteParams,
  UpdateApplicationNoteParams,
  FindApplicationNotesParams
> implements ApplicationNotesApi {
  protected path = 'application-notes';
}
