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
  variablesIds?: string[] | null;
  group?: string;
  autoPassCondition?: FormulaCondition | null;
  blockedStatuses?: Array<{
    id: string;
    name: string;
  }>;
  dueDate?: Date;
  createdBy?: UserShort | null;
  updatedBy?: UserShort | null;
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
  application: string;
  description: string;
  assignee: TaskAssignee;
  status?: TaskStatus;
  group?: string | null;
  blockedStatuses?: string[];
  variables?: string[] | null;
  autoPassCondition?: string | null;
  dueDate?: string | null;
  uniqSystemIdentifier?: string;
}

export interface UpdateTaskParams {
  description?: string;
  status?: TaskStatus;
  assignee?: TaskAssignee;
  group?: string | null;
  variablesIds?: string[] | null;
  autoPassCondition?: string | null;
  blockedStatuses?: string[] | null;
  dueDate?: string | null;
}

export enum TaskSortField {
  Description = 'description',
  Status = 'status',
  ApplicationId = 'applicationId',
  UpdatedAt = 'updatedAt',
  DueDate = 'dueDate',
}

export interface FindTasksParams extends PaginationParams<TaskSortField>{
  assignedTeamMembersIds?: string[];
  teamMembersIds?: string[];
  statuses?: TaskStatus[];
  groups?: string[];
  applicationId?: string;
  dueCreatedDateFrom?: string;
  dueCreatedDateTo?: string;
  dueUpdatedDateFrom?: string;
  dueUpdatedDateTo?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
}

export interface BulkCreateTasksParams {
  application: string;
  batch: Array<Omit<CreateTaskParams, 'application'>>;
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
  protected basePath = 'tasks';
  protected entityKey = 'task';

  public async find(params: FindTasksParams): Promise<PaginationResult<Task>> {
    const tasks = await super.find(params);

    return tasks as PaginationResult<Task>;
  }

  public bulkCreate(params: BulkCreateTasksParams) {
    return this.apiClient.makeCall<BulkCreateTasksResponse>(`/${this.basePath}/batch`, 'POST', params);
  }
}
