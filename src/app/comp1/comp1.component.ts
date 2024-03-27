import { Component, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import {HttpClient, HttpErrorResponse, provideHttpClient} from '@angular/common/http';
import {NgStyle} from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkDragDrop, moveItemInArray, transferArrayItem,  CdkDrag, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import { BoardComponent } from "../board/board.component";
import { Row } from '../models/row.model';
import { RowService } from '../service/row.service';




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
        BoardComponent
    ]
})
export class Comp1Component {

  allRows!: Row[];
  dlugoscListyRows!: number;


  

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

  constructor(private cardService: CardsService, private rowService: RowService, private http: HttpClient, private toastr: ToastrService) {}

    usunKarte(positionNumber: number, name: string) {
      console.log(positionNumber + " " + name + " " + this.data);
      if(confirm("Usunąć kolumne "+name + "?")) {
        this.rowService.deleteColumnInRow(positionNumber).subscribe({
          next: (positionNumber: Row) => {
            this.toastr.success('Usunięto kolumne');
            this.fetchCards();
          },
          error: (error) => {
            this.toastr.error('Nie udało się usunąć kolumny');
          }
        })
        }

      }

      przesunKarte(sourceId: number, destinationId: number){

        this.cardService.przesunKarte(sourceId, destinationId).subscribe(() => {
          this.fetchCards();
        });

      }

  changeLimit(cardId: number, limit: string, maxTasksLimit: number) {
    let limit2 = parseInt(limit);

    this.cardService.changeLimit(cardId, limit2).subscribe(() => {
      this.fetchCards();
    });
  }


  usunTask(taskId: number, cardId: number) {
    this.cardService.deleteTask(taskId, cardId).subscribe(() => {
      this.fetchCards();
    });
  }

  cardName = '';
  dodajKarte(cardName: string) {

    if(cardName.trim() == ''){
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
      }
    })
  }
  zmainaNazwyKarty(cardId: number, newName: string){
    
    this.cardService.zmainaNazwyKarty(cardId, newName).subscribe({
      next: (newName: string) =>{
        this.toastr.success("Zmieniono nazwę");
        this.fetchCards();
      },
      error:  (error) => {
        this.toastr.error('Nie udało się zmienić nazwy');
      }
      })
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
    this.rowService.getAll().subscribe({
      next: (rows: Row[])=>{
        this.allRows = rows;
        this.data = rows[0].cardsinrow;
        this.dlugoscListyRows = rows.length;
      },
      error: (error)=> {

      }
    })
  }
  }

 