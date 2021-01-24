import { TodoStatus } from '../../types';

export interface ITodoItem {
  id?: string;
  text: string;
  index?: number;
  isEditing?: boolean;
  status?: TodoStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
