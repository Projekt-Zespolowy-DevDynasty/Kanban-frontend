import { User } from "./user.model";

export interface Task {
    id: number;
    name: string;
    users: User[];
}
  