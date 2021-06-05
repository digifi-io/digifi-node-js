import { SystemApi } from './SystemApi';
import { BorrowerType } from './BorrowersApi';
import { VariableValue, UserShortInfo } from '../types';

export enum TaskStatus {
  Done = 'Done',
  NotDone = 'Not Done'
}

export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: string;
  description: string;
  teamMembers: UserShortInfo[];
  status: TaskStatus;
  application: {
    id: string;
    displayId: number;
    variables: Record<string, VariableValue>;
    borrowerType: BorrowerType;
  } | null;
}

export interface CreateTaskParams {
  teamMemberIds?: string[];
  applicationId?: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export default class TasksApi extends SystemApi<Task, CreateTaskParams, Partial<CreateTaskParams>> {
  protected basePath = 'tasks';
  protected entityKey = 'task';
}
