import { Component, Input } from '@angular/core';
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
export class BoardComponent {


    @Input() rowId!: number;

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
    
      constructor(private rowService: RowService, private cardService: CardsService, private http: HttpClient, private toastr: ToastrService) {}

    
    
      usunTask(taskId: number, cardId: number) {
        this.cardService.deleteTask(taskId, cardId).subscribe(() => {
          this.fetchCards();
        });
      }
    
      zmianaNazwyTaska(taskId: number, newNameTask :string){
        this.cardService.zmianaNazwyTaska(taskId, newNameTask).subscribe(() => {
          this.fetchCards();
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
    
      ngOnInit(): void{
        this.fetchCards();
      }
      fetchCards(){
        this.rowService.getRowById(this.rowId).subscribe((row: Row) => {
            this.data = row.cardsinrow;
        });
      }
}
