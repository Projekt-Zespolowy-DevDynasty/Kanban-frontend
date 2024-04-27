import { TaskComponent } from '../task/task.component';
import { Task } from './task.model';

export interface Card {
  id: number;
  name: string;
  maxTasksLimit: number;
  position: number;
  tasks: Task[];
}
