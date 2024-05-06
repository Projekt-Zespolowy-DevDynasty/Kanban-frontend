import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import { NgStyle } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { BoardComponent } from '../board/board.component';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ListOfUsersNotInTaskComponent } from '../list-of-users-not-in-task/list-of-users-not-in-task.component';
import { TaskService } from '../service/tasks.service';
import { SubTaskComponent } from '../sub-task/sub-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    NgStyle,
    ListOfUsersNotInTaskComponent,
    SubTaskComponent,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() card!: Card;
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();
  @Input() allUsers!: User[];

  cardService = inject(CardsService);
  userService = inject(UserService);
  toastr = inject(ToastrService);
  taskService = inject(TaskService);

  usersNotInTask!: User[];
  usersInTask!: User[];
  sortedListOfTasks!: Task[];

  drop(event: CdkDragDrop<Task[]>) {
    // source id
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log('New index of the moved item:', event.currentIndex);
    this.przesTask(
      event.item.data[0].id,
      event.item.data[1].id,
      Number(event.container.id),
      event.currentIndex,
    );
  }
  przesTask(
    sourceCardId: number,
    taskId: number,
    destinationCardId: number,
    index: number,
  ) {
    this.cardService
      .moveTasks(sourceCardId, taskId, destinationCardId, index)
      .subscribe(() => {
        this.refreshParent.emit();
      });
  }

  usunTask(taskId: number, cardId: number) {
    if (confirm('Usunąć zadanie ' + '?')) {
      this.cardService.deleteTask(taskId, cardId).subscribe(() => {
        this.refreshParent.emit();
      });
    }
  }

  zmianaNazwyTaska(taskId: number, newNameTask: string) {
    this.cardService.zmianaNazwyTaska(taskId, newNameTask).subscribe(() => {
      this.refreshParent.emit();
    });
  }

  updateTask() {
    this.cardService.getOneCard(this.card.id).subscribe((card: Card) => {
      this.card = card;
      this.sortedListOfTasks = this.card.tasks.sort(
        (a, b) => a.position - b.position,
      );
    });
  }
  getAllUsers() {
    this.userService.getAllUser().subscribe((users: User[]) => {
      this.allUsers = users;
    });
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES **************/
    this.fetchCard();
  }
  fetchCard() {
    this.cardService.getOneCard(this.card.id).subscribe((card: Card) => {
      this.card = card;
      this.sortedListOfTasks = this.card.tasks.sort(
        (a, b) => a.position - b.position,
      );
    });
  }

  zmianaKolorTaska(taskId: number, color: string) {
    this.taskService.changeColorTask(taskId, color).subscribe(() => {
      this.fetchCard();
    });
  }
}
