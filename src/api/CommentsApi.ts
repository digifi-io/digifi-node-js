import { SystemApi } from './base/SystemApi';
import { BorrowerType } from '../enums';
import { BasicVariableValue, UserShort } from '../types';

export enum CommentReferenceType {
  Task = 'task',
}

export enum CommentAuthorType {
  SystemUser = 'systemUser',
  Borrower = 'borrower',
  Intermediary = 'intermediary',
}

interface BorrowerCommentAuthor {
  id: string;
  type: BorrowerType;
  variables: Record<string, BasicVariableValue>;
}

interface IntermediaryCommentAuthor {
  id: string;
  variables: Record<string, BasicVariableValue>;
}

export type Comment = {
  id: string;
  message: string;
  organizationId: string;
  referenceId: string;
  referenceType: string;
  messageEditedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  testing?: boolean;
} & ({
  authorType: CommentAuthorType.Borrower;
  author: BorrowerCommentAuthor;
} | {
  authorType: CommentAuthorType.Intermediary;
  author: IntermediaryCommentAuthor;
} | {
  authorType: CommentAuthorType.SystemUser;
  author: UserShort;
});

export interface CreateCommentParams {
  message: string;
  referenceId: string;
  referenceType: CommentReferenceType;
  authorId: string;
  authorType: CommentAuthorType.Borrower | CommentAuthorType.Intermediary;
}

export interface UpdateCommentParams {
  message: string;
}

export interface FindCommentsParams {
  referenceId?: string;
  referenceType?: CommentReferenceType;
  authorId?: string;
}

export interface CommentsApi {
  find(params: FindCommentsParams): Promise<Comment[]>;
  create(params: CreateCommentParams): Promise<Comment>;
  update(id: string, params: UpdateCommentParams): Promise<Comment>;
  delete(id: string): Promise<Comment>;
}

export class CommentsRestApi extends SystemApi<
  Comment,
  CreateCommentParams,
  UpdateCommentParams,
  FindCommentsParams
> implements CommentsApi {
  protected path = '/comments';

  public async find(params: FindCommentsParams): Promise<Comment[]> {
    const comments = await super.find(params);

    return comments as Comment[];
  }
}
