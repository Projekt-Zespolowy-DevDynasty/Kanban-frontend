import { Task } from "./task.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    maxUserTasksLimit: number;
    color: string;
    tasks: Task[];
  }
  