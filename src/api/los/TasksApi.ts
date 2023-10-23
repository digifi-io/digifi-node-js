import { SystemApi } from '../SystemApi';
import { BorrowerType } from '../../enums';
import { PaginationParams, PaginationResult, UserShort, VariableValue } from '../../types';
import { FormulaCondition } from '../../data/models';

export enum TaskStatus {
  Done = 'Done',
  NotDone = 'Not Done',
  InReview = 'In Review',
}

export enum TaskAssigneeType {
  Borrower = 'borrower',
  Intermediary = 'intermediary',
  Organization = 'organization',
}

export interface TaskAssignedBorrower {
  id: string;
  type: BorrowerType;
  variables: Record<string, VariableValue>;
}

export interface TaskAssignedIntermediary {
  id: string;
  variables: Record<string, VariableValue>;
}

export interface TaskApplication {
  id: string;
  displayId: string;
  autoPassCondition?: FormulaCondition | null;
  borrower: {
    id: string;
    type: BorrowerType;
  };
  teamMembers: string[];
  variables: Record<string, VariableValue>;
}

export interface Task {
  id: string;
  description: string;
  status: TaskStatus;
  application: TaskApplication;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  assigneeType: TaskAssigneeType;
  assignedBorrower?: TaskAssignedBorrower | null;
  assignedIntermediary?: TaskAssignedIntermediary | null;
  variables?: string[] | null;
  group?: string;
  autoPassCondition?: FormulaCondition | null;
  blockedStatuses?: Array<{ id: string; name: string }>;
  dueDate?: Date;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
  testing?: boolean;
}

export type TaskAssignee = {
  assigneeType: TaskAssigneeType.Borrower;
  assigneeId: string;
} | {
  assigneeType: TaskAssigneeType.Intermediary;
  assigneeId: string;
} | {
  assigneeType: TaskAssigneeType.Organization;
}

export interface CreateTaskParams {
  applicationId: string;
  description: string;
  assignee: TaskAssignee;
  status?: TaskStatus;
  group?: string | null;
  blockedStatusesIds?: string[];
  variables?: string[] | null;
  autoPassCondition?: string | null;
  dueDate?: string | null;
  uniqSystemIdentifier?: string;
  shouldSendAssignmentEmail?: boolean;
}

export interface UpdateTaskParams {
  description?: string;
  status?: TaskStatus;
  assignee?: TaskAssignee;
  group?: string | null;
  variables?: string[] | null;
  autoPassCondition?: string | null;
  blockedStatusesIds?: string[] | null;
  dueDate?: string | null;
  shouldSendAssignmentEmail?: boolean;
}

export enum TaskSortField {
  Description = 'description',
  Status = 'status',
  ApplicationId = 'applicationId',
  UpdatedAt = 'updatedAt',
  DueDate = 'dueDate',
}

export interface FindTasksParams extends PaginationParams<TaskSortField>{
  statuses?: TaskStatus[];
  nonInStatus?: TaskStatus;
  groups?: string[];
  applicationId?: string;
  assignedTeamMembersIds?: string[];
  teamMembersIds?: string[];
  assigneeId?: string;
  assigneeType?: TaskAssigneeType;
  dueUpdatedDateFrom?: Date | string;
  dueUpdatedDateTo?: Date | string;
}

export interface BulkCreateTasksParams {
  applicationId: string;
  batch: Array<Omit<CreateTaskParams, 'applicationId'>>;
}

export interface BulkCreateTasksResponse {
  count: number;
  batch: Task[];
}

export default class TasksApi extends SystemApi<
  Task,
  CreateTaskParams,
  UpdateTaskParams,
  FindTasksParams
> {
  protected path = 'tasks';

  public async find(params: FindTasksParams): Promise<PaginationResult<Task>> {
    const tasks = await super.find(params);

    return tasks as PaginationResult<Task>;
  }

  public bulkCreate(params: BulkCreateTasksParams) {
    return this.apiClient.makeCall<BulkCreateTasksResponse>(`/${this.path}/batch`, 'POST', params);
  }
}
