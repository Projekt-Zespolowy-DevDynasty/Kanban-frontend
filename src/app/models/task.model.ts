import { User } from "./user.model";

import { SubTask } from "./subTask.model";

export interface Task {
    id: number;
    name: string;
    color: string;
    position: number,
    useers: User[];
    subTasks: SubTask[];

}
  