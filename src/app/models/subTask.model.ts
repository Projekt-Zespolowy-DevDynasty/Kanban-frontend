import { Task } from './task.model';

export interface SubTask {
  id: number;
  name: string;
  finished: boolean;
  position: number;
  color: string;
  task?: Task;
}
