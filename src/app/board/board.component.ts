import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Comp1Component } from "../comp1/comp1.component";
import {Row} from "../models/row.model";
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardsService } from '../service/cards.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Card } from '../models/card.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgStyle } from '@angular/common';
import { RowService } from '../service/row.service';

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
        NgStyle
    ]
})
export class BoardComponent implements OnInit, OnChanges {

    constructor(private rowService: RowService, private cardService: CardsService, private http: HttpClient, private toastr: ToastrService) {}

    @Input() rowId!: number;
    @Input() allRows!: Row[];
    newRow!: Row;
    data!: Card[];

    drop(event: CdkDragDrop<{id: number, name: string}[]>) {
    
        // source id 
        console.log( "destination id" + event.container.id);
        // destination id
        console.log("source id" + event.item.data[0].id)
        // task id 
        console.log("task id" + event.item.data[1].id)
    
    
        if (event.previousContainer === event.container) {
          console.log("moveItemInArray" + event)
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        }
        this.przesTask(event.item.data[0].id, event.item.data[1].id, Number(event.container.id));
    
      }
    
      przesTask(sourceCardId: number,taskId :number, destinationCardId: number) {
    
        this.cardService.moveTasks(sourceCardId, taskId, destinationCardId).subscribe(() => {
          this.fetchCards();
        });
    
      }
    

    
    
      usunTask(taskId: number, cardId: number) {
        if(confirm("Usunąć zadanie?")) {
          this.cardService.deleteTask(taskId, cardId).subscribe(() => {
            this.fetchCards();
          });
        }
      }
    
      zmianaNazwyTaska(taskId: number, newNameTask :string){
        this.cardService.zmianaNazwyTaska(taskId, newNameTask).subscribe(() => {
          this.fetchCards();
        });
    
      }
    
      
      //private cardService = inject(CardsService);
    
      value = '';
    
      onEnter(value: string, card_id: number) {
    
        this.cardService.putTask(value, card_id).subscribe(() => {
          this.fetchCards();
        });
        this.value = value;
      }
    
      ngOnInit(): void{
        this.fetchCards();
      }
      ngOnChanges() {
        /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES **************/
        this.fetchCards();
        }
      fetchCards(){
        this.rowService.getRowById(this.rowId).subscribe((row: Row) => {
            this.data = row.cardsinrow;
            this.newRow = row;
        });
      }

      usunWiersz(rowId: number){
     //if(confirm("Usunąć kolumne "+name + "?")) {
        this.rowService.deleteRow(rowId).subscribe ({
          next: (rowId: Row) => {
            this.toastr.success('Usunięto wiersz');
            this.fetchCards();
          },
          error: (error) => {
            this.toastr.error('Nie udało się usunąć wiersza');
          }
        })
      //  }

      }
      przeniesGora(rowId: number){
        this.rowService.moveUpRow(rowId).subscribe (() =>{
            this.fetchCards();
        });

      }
      przeniesDol(rowId: number){
        this.rowService.moveDownRow(rowId).subscribe (() =>{
            this.fetchCards();
        });

      }
      
}
