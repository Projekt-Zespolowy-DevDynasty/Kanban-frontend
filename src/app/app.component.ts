import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Comp1Component } from './comp1/comp1.component';
import { BoardComponent } from './board/board.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkDragDrop, moveItemInArray, transferArrayItem,  CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Comp1Component, BoardComponent, MatSlideToggleModule, CdkDropList, CdkDrag, CdkDropListGroup],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BOARD-KANBAN';

  Data = [
    {
      id: 866881,
      title: 'To Do',
      tasks: [
        { id: 1, name: 'Get to work' },
        { id: 2, name: 'Pick up groceries' },
        { id: 3, name: 'Go home' },
        { id: 4, name: 'Fall asleep' }
      ]
    },
    {
      id: 777772,
      title: 'In Progress',
      tasks: [
        { id: 5, name: 'Get up' },
        { id: 6, name: 'Brush teeth' },
        { id: 7, name: 'Take a shower' },
        { id: 8, name: 'Check e-mail' },
        { id: 9, name: 'Walk dog' }
      ]
    },
    {
      id: 6666663,
      title: 'Done',
      tasks: [
        { id: 10, name: 'Eat breakfast' },
        { id: 11, name: 'Read a book' },
        { id: 12, name: 'Watch TV' },
        { id: 13, name: 'Watch TV' },]}
  ]


  drop(event: CdkDragDrop<{id: number, name: string}[]>) {
    
    // source id 
    console.log( "destination id" + event.container.id);
    // destination id
    console.log("source id" + event.item.data[0].id)
    // task id 
    console.log("task id" + event.item.data[1].id)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
