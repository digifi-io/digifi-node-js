import { SystemApi } from './base/SystemApi';
import {
  WithOptionalResourceMetadata,
  WithResourceMetadata,
} from '../types/ResourceMetadata';

export interface TaskAgentSession extends WithResourceMetadata {
  id: string;
  taskId: string;
  applicationId: string;
  createdAt: Date;
}

export interface CreateTaskAgentSessionParams extends WithOptionalResourceMetadata {
  taskId: string;
}

export interface TaskAiAgentsApi {
  create(params: CreateTaskAgentSessionParams): Promise<TaskAgentSession>;
}

export class TaskAiAgentsRestApi extends SystemApi<
  TaskAgentSession,
  CreateTaskAgentSessionParams
> implements TaskAiAgentsApi {
  protected path = '/task-agents';
}
