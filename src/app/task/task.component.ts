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

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    NgStyle,
    BoardComponent
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() card!: Card;
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();

  cardService = inject(CardsService);

  
  drop(event: CdkDragDrop<{ id: number; name: string }[]>) {
    // source id
    console.log('destination id' + event.container.id);
    // destination id
    console.log('source id' + event.item.data[0].id);
    // task id
    console.log('task id' + event.item.data[1].id);

    if (event.previousContainer === event.container) {
      console.log('moveItemInArray' + event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.przesTask(
      event.item.data[0].id,
      event.item.data[1].id,
      Number(event.container.id)
    );
  }
  przesTask(sourceCardId: number, taskId: number, destinationCardId: number) {
    this.cardService
      .moveTasks(sourceCardId, taskId, destinationCardId)
      .subscribe(() => {
        //this.fetchCards();
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

  
  // fetchCards() {
  //   this.rowService.getAll().subscribe({
  //     next: (rows: Row[]) => {
  //       this.allRows = rows;
  //       this.data = rows[0].cardsinrow;
  //       this.dlugoscListyRows = rows.length;
  //     },
  //     error: (error) => {},
  //   });
  // }
}
