import { SystemApi } from './SystemApi';
import { BorrowerType } from './BorrowersApi';
import { VariableValue } from '../types';

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
  assigneeType: TaskAssigneeType;
  application: TaskApplication;
  organizationId: string;
  group?: string;
  autoPassCondition?: {
    formula: string;
    formulaRequiredVariables: string[];
  } | null;
  assignedBorrower?: TaskAssignedBorrower | null;
  assignedIntermediary?: TaskAssignedIntermediary | null;
  variablesIds?: string[] | null;
  blockedStatuses?: Array<{
    id: string;
    name: string;
  }> | null;
  dueDate?: string | null;
  createdAt: Date;
  updatedAt: Date;
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
  autoPassCondition?: string | null;
  group?: string | null;
  dueDate?: string | null;
  variablesIds?: string[] | null;
  blockedStatuses?: string[] | null;
  uniqSystemIdentifier?: string;
}

export interface UpdateTaskParams {
  assignee?: TaskAssignee;
  description?: string;
  status?: TaskStatus;
  autoPassCondition?: string | null;
  dueDate?: string | null;
  group?: string | null;
  variablesIds?: string[] | null;
  blockedStatuses?: string[] | null;
}

export interface BulkCreateTasksParams {
  application: string;
  batch: Array<Omit<CreateTaskParams, 'application'>>;
}

export interface BulkCreateTasksResponse {
  count: number;
  batch: Task[];
}

export default class TasksApi extends SystemApi<Task, CreateTaskParams, UpdateTaskParams> {
  protected basePath = 'tasks';
  protected entityKey = 'task';

  public bulkCreate(params: BulkCreateTasksParams) {
    return this.apiClient.makeCall<BulkCreateTasksResponse>(`/${this.basePath}/batch`, 'POST', params);
  }
}
