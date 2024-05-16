import { SystemApi } from './base/SystemApi';
import { PaginationParams, PaginationResult } from '../types';
import { FormulaCondition } from '../data/models';
import { CursorPaginationParams, CursorPaginationResult } from '../types/Pagination';

export enum ExternalTaskAssigneeType {
  Borrower = 'borrower',
  Intermediary = 'intermediary',
}

export enum TaskStatus {
  NotDone = 'Not Done',
  InProgress = 'In Progress',
  InReview = 'In Review',
  Done = 'Done',
  Cancelled = 'Cancelled',
  Failed = 'Failed',
}

export enum TaskSortField {
  Title = 'title',
  Status = 'status',
  ApplicationId = 'applicationId',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Description = 'description',
}

export interface IUpdateExternalAssigneeParams {
  assigneeId: string;
  assigneeType: ExternalTaskAssigneeType;
}

export interface TaskExternalAssignee {
  assigneeType: ExternalTaskAssigneeType;
  id: string;
}

export interface Task {
  id: string;
  status: TaskStatus;
  title: string;
  organizationId: string;
  applicationId: string;
  productId: string;
  applicationDisplayId: string;
  createdAt: Date;
  updatedAt: Date;
  labelIds: string[];
  version: number;
  assignedTeamMemberIds: string[];
  externalAssignee?: TaskExternalAssignee | null;
  internalInstructions?: string | null;
  externalInstructions?: string | null;
  variables?: string[] | null;
  group?: string;
  autoPassCondition?: FormulaCondition | null;
  dueDateAndTime?: Date | null;
  testing?: boolean;
  blockedApplicationStatusIds?: string[] | null;
  createdById?: string | null;
  updatedById?: string | null;
  sendExternalAssignmentEmail?: boolean;
}

export interface CreateTaskParams {
  applicationId: string;
  title: string;
  status?: TaskStatus;
  externalAssignee?: IUpdateExternalAssigneeParams;
  internalInstructions?: string;
  externalInstructions?: string;
  assignedTeamMemberIds?: string[];
  labelIds?: string[];
  blockedApplicationStatusIds?: string[];
  variables?: string[];
  group?: string;
  autoPassCondition?: string;
  dueDateAndTime?: Date;
  uniqSystemIdentifier?: string;
  sendExternalAssignmentEmail?: boolean;
}

export type UpdateTaskLabelsParams = {
  set: string[];
} | {
  add?: string[];
  remove?: string[];
}

export interface UpdateTaskParams {
  status?: TaskStatus;
  title?: string;
  internalInstructions?: string | null;
  externalInstructions?: string | null;
  externalAssignee?: IUpdateExternalAssigneeParams | null;
  dueDateAndTime?: Date | null;
  group?: string | null;
  variables?: string[] | null;
  autoPassCondition?: string | null;
  blockedApplicationStatusIds?: string[] | null;
  assignedTeamMemberIds?: string[];
  labels?: UpdateTaskLabelsParams;
  sendExternalAssignmentEmail?: boolean;
}

export interface SearchTasksParams extends PaginationParams<TaskSortField> {
  statuses?: TaskStatus[];
  nonInStatus?: TaskStatus;
  groups?: string[];
  applicationId?: string;
  assignedTeamMemberIds?: Array<'unassigned' | string>;
  updatedDateFrom?: Date | string;
  updatedDateTo?: Date | string;
  dueDateTo?: Date | string;
  dueDateFrom?: Date | string;
  externalAssigneeId?: string;
  externalAssigneeType?: ExternalTaskAssigneeType;
  labelIds?: string[];
}

export interface ListTasksParams extends CursorPaginationParams {
  statuses?: TaskStatus[];
  applicationId?: string;
}

export interface BulkCreateTasksParams {
  applicationId: string;
  batch: Array<Omit<CreateTaskParams, 'applicationId'>>;
}

export interface BulkCreateTasksResponse {
  count: number;
  batch: Task[];
}

export interface TasksApi {
  search(params: SearchTasksParams): Promise<PaginationResult<Task>>;
  list(params: ListTasksParams): Promise<CursorPaginationResult<Task>>;
  findById(id: string): Promise<Task>;
  create(params: CreateTaskParams): Promise<Task>;
  update(id: string, params: UpdateTaskParams): Promise<Task>;
  bulkCreate(params: BulkCreateTasksParams): Promise<BulkCreateTasksResponse>;
  delete(id: string): Promise<Task>;
}

export class TasksRestApi extends SystemApi<
  Task,
  CreateTaskParams,
  UpdateTaskParams,
  SearchTasksParams,
  ListTasksParams
> implements TasksApi {
  protected path = 'tasks';

  public bulkCreate(params: BulkCreateTasksParams) {
    return this.apiClient.makeCall<BulkCreateTasksResponse>(`/${this.path}/batch`, 'POST', params);
  }
}
