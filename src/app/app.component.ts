import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Comp1Component } from './comp1/comp1.component';
import { BoardComponent } from './board/board.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Comp1Component, BoardComponent, CdkDropListGroup],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'BOARD-KANBAN';
}
