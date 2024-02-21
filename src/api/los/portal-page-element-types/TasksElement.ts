import { PortalPageElementType, BasePortalPageElement } from './BasePortalPageElement';

export type TasksElementConfig = Record<string, never>;

export interface TasksElement extends BasePortalPageElement {
  elementType: PortalPageElementType.Tasks;
  config: TasksElementConfig;
}
