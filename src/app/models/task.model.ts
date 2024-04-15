import { User } from "./user.model";

export interface Task {
    id: number;
    name: string;
    color: string;
    position: number,
    useers: User[];
}
  