import { Component, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
} from '@angular/common/http';
import { NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
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
import { Row } from '../models/row.model';
import { RowService } from '../service/row.service';
import { TaskComponent } from '../task/task.component';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-comp1',
  standalone: true,
  providers: [CardsService, RowService],
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
  ],
})
export class Comp1Component {
  allRows!: Row[];
  dlugoscListyRows!: number;

  Users = [
    { id: 1, name: 'Jan Kowalski' },
    { id: 2, name: 'Adam Nowak' },
    { id: 3, name: 'Piotr Nowak' },
    { id: 4, name: 'Krzysztof Gołębiewski' },
  ]
  tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      users: [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
      ],
    },
    {
      id: 2,
      name: 'Task 2',
      users: [
        { id: 3, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com' },
      ],
    },
    // ... more tasks
  ];





  constructor(
    private cardService: CardsService,
    private rowService: RowService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  usunKarte(positionNumber: number, name: string) {
    console.log(positionNumber + ' ' + name + ' ' + this.data);
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



  cardName = '';
  dodajKarte(cardName: string) {
    if (cardName.trim() == '') {
      this.toastr.warning('Nie można dodać karty bez nazwy');
      return;
    }

    this.rowService.addColumnInRow(cardName).subscribe({
      next: (myRow: Row) => {
        this.toastr.success('Dodano karte');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać karty');
      },
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


  data!: Card[];
  //private cardService = inject(CardsService);

  value = '';

  onEnter(value: string, card_id: number) {
    this.cardService.putTask(value, card_id).subscribe(() => {
      this.fetchCards();
    });
    this.value = value;
  }

  ngOnInit(): void {
    this.fetchCards();
  }
  ngAfterViewInit() {
    this.fetchCards();
  }

  fetchCards() {
    this.rowService.getAll().subscribe({
      next: (rows: Row[]) => {
        this.allRows = rows;
        this.data = rows[0].cardsinrow;
        this.dlugoscListyRows = rows.length;
      },
      error: (error) => {},
    });
  }
  dodajWiersz(rowName: string) {
    this.rowService.addRow(rowName).subscribe({
      next: (addRow: Row) => {
        this.toastr.success('Dodano wiersz');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się dodać wiersza');
      },
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
}
