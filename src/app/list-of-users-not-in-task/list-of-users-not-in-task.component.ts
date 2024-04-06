import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { TaskService } from '../service/tasks.service';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-list-of-users-not-in-task',
  standalone: true,
  providers: [UserService, TaskService],
  imports: [],
  templateUrl: './list-of-users-not-in-task.component.html',
  styleUrl: './list-of-users-not-in-task.component.scss'
})
export class ListOfUsersNotInTaskComponent {
  @Input() taskId!: number;
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();
  usersNotInTask!: User[];
  @Input() allUsers!: User[];
  @Input() task!: Task;
  usersInTask!: User[];

  constructor(private userService: UserService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllUsersNotInTask(this.taskId);
    this.getAllUsersInTask(this.taskId);
  }
  reloadComponent() {
    this.getAllUsersNotInTask(this.taskId);
    this.getAllUsersInTask(this.taskId);
  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES **************/
    this.reloadComponent();
  }

  getAllUsersNotInTask(taskId: number){
    this.userService.AllUserNotInTAsk(taskId).subscribe((users) => {
      this.usersNotInTask = users;
    });
  }

  getAllUsersInTask(taskId: number){
    this.userService.AllUserInTask(taskId).subscribe((users) => {
      console.log(users);
      this.usersInTask = users;
    });
  }

  przypiszUsera(userId: number, taskId: number) {
    this.userService.assignUserToTask(userId, taskId).subscribe({
      next: () => {
        this.refreshParent.emit();
        this.reloadComponent();
      },
      error: (err) => {
        console.log(err);
      },
    });
    }
  usunUsera(userId: number,argTaskId: number) {
    this.userService.deleteUserFromTask(userId, argTaskId).subscribe({
      next: () => {
        this.refreshParent.emit();
        this.reloadComponent();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
