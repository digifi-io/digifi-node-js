import { SystemApi } from './SystemApi';
import { BorrowerType } from './BorrowersApi';
import { UserShortInfo, VariableValue } from '../types';

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
  variables: Record<string, VariableValue>;
}

interface IntermediaryCommentAuthor {
  id: string;
  variables: Record<string, VariableValue>;
}

export type Comment = {
  id: string;
  message: string;
  organizationId: string;
  referenceId: string;
  referenceType: CommentReferenceType;
  messageEditedAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
} & ({
  authorType: CommentAuthorType.Borrower;
  author: BorrowerCommentAuthor;
} | {
  authorType: CommentAuthorType.Intermediary;
  author: IntermediaryCommentAuthor;
} | {
  authorType: CommentAuthorType.SystemUser;
  author: UserShortInfo;
});

export interface CreateCommentParams {
  message: string;
  reference: string;
  referenceType: CommentReferenceType;
  author: string;
  authorType: CommentAuthorType.Borrower | CommentAuthorType.Intermediary;
}

export interface UpdateCommentParams {
  message: string;
}

export default class CommentsApi extends SystemApi<Comment, CreateCommentParams, UpdateCommentParams> {
  protected basePath = 'comments';
}
