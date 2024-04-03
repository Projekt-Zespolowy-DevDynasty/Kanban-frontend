import { Task } from "./task.model";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    colour: string;
    tasks: Task[];
  }
  