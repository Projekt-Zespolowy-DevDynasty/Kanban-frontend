import { Component } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import { NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { BoardComponent } from '../board/board.component';
import { Row } from '../models/row.model';
import { RowService } from '../service/row.service';
import { TaskComponent } from '../task/task.component';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RowCardUserButtonsComponent } from './row-card-user-buttons/row-card-user-buttons.component';

@Component({
  selector: 'app-comp1',
  standalone: true,
  providers: [CardsService, RowService, UserService],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.scss',
  imports: [
    MatSlideToggleModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    NgStyle,
    BoardComponent,
    TaskComponent,
    ReactiveFormsModule,
    RowCardUserButtonsComponent
  ],
})
// main board 
export class Comp1Component {
  allRows!: Row[];
  dlugoscListyRows!: number;
  data!: Card[];
  allUsers!: User[];

  ngOnInit(): void {
    this.fetchCards();
    this.fetchUsers();
  }
  ngAfterViewInit() {
    this.fetchCards();
  }

  constructor(
    private cardService: CardsService,
    private rowService: RowService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}



  usunKarte(positionNumber: number, name: string) {
    if (confirm('Usunąć kolumne ' + name + '?')) {
      this.rowService.deleteColumnInRow(positionNumber).subscribe({
        next: (positionNumber: Row) => {
          this.toastr.success('Usunięto kolumne');
          this.fetchCards();
        },
        error: (error) => {
          this.toastr.error('Nie udało się usunąć kolumny');
        },
      });
    }
  }

  przesunKarte(sourceColumnPosition: number, targetColumnPosition: number) {
    this.rowService
      .moveColumn(sourceColumnPosition, targetColumnPosition)
      .subscribe(() => {
        this.fetchCards();
      });
  }

  changeLimit(cardId: number, limit: string, maxTasksLimit: number) {
    let limit2 = parseInt(limit);

    this.cardService.changeLimit(cardId, limit2).subscribe(() => {
      this.fetchCards();
    });
  }

  zmainaNazwyKarty(cardId: number, newName: string) {
    this.cardService.zmainaNazwyKarty(cardId, newName).subscribe({
      next: (newName: string) => {
        this.toastr.success('Zmieniono nazwę');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się zmienić nazwy');
      },
    });
  }

  value = '';
  onEnter(value: string, card_id: number) {
    this.cardService.putTask(value, card_id).subscribe(() => {
      this.fetchCards();
    });
    this.value = value;
  }

  fetchCards() {
    this.rowService.getAll().subscribe({
      next: (rows: Row[]) => {
        //console.log(rows[0].cardsInRow);
        this.allRows = rows;
        this.data = rows[0].cardsinrow;
        this.dlugoscListyRows = rows.length;
      },
      error: (error) => {},
    });
  }

  przeniesGora(rowId: number) {
    this.rowService.moveUpRow(rowId).subscribe(() => {
      this.fetchCards();
    });
  }
  renameRow(rowId: number, newName: string) {
    this.rowService.renameRow(rowId, newName).subscribe(() => {
      this.fetchCards();
    });
  }
  usunWiersz(rowId: number) {
    if (confirm('Usunąć wiersz ' + '?')) {
      this.rowService.deleteRow(rowId).subscribe({
        next: (rowId: Row) => {
          this.toastr.success('Usunięto wiersz');
          this.fetchCards();
        },
        error: (error) => {
          this.toastr.error('Nie udało się usunąć wiersza');
        },
      });
    }
  }

  przeniesDol(rowId: number) {
    this.rowService.moveDownRow(rowId).subscribe(() => {
      this.fetchCards();
    });
  }


  fetchUsers() {
    this.userService.getAllUser().subscribe({
      next: (users: User[]) => {
        this.allUsers = users;
      },
      error: (error) => {},
    });
}   

}
