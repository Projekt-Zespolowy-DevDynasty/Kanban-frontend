import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Comp1Component } from '../comp1/comp1.component';
import { Row } from '../models/row.model';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CardsService } from '../service/cards.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Card } from '../models/card.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgStyle } from '@angular/common';
import { RowService } from '../service/row.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [CardsService, RowService],
  imports: [
    MatSlideToggleModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    NgStyle,
    TaskComponent,
  ],
})
export class BoardComponent implements OnInit, OnChanges {
  constructor(
    private rowService: RowService,
    private cardService: CardsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  @Input() rowId!: number;
  @Input() allRows!: Row[];
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();
  newRow!: Row;
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
  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES **************/
    this.fetchCards();
  }
  fetchCards() {
    this.rowService.getRowById(this.rowId).subscribe((row: Row) => {
      this.data = row.cardsinrow;
      this.newRow = row;
    });
  }

  usunWiersz(rowId: number) {
    //if(confirm("Usunąć kolumne "+name + "?")) {
    this.rowService.deleteRow(rowId).subscribe({
      next: (rowId: Row) => {
        this.toastr.success('Usunięto wiersz');
        this.fetchCards();
      },
      error: (error) => {
        this.toastr.error('Nie udało się usunąć wiersza');
      },
    });
    //  }
  }
  przeniesGora(rowId: number) {
    this.rowService.moveUpRow(rowId).subscribe(() => {
      this.fetchCards();
    });
  }
  przeniesDol(rowId: number) {
    this.rowService.moveDownRow(rowId).subscribe(() => {
      this.fetchCards();
    });
  }
}
