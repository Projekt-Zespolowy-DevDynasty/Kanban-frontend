import { Component, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [
    NgStyle
  ],
  providers: [CardsService],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.scss'
})
export class Comp1Component {

przesTask(sourceCardId: number,taskId :number, destinationCardId: number) {

  console.log(sourceCardId, taskId, destinationCardId);
  this.cardService.moveTasks(sourceCardId, taskId, destinationCardId).subscribe(() => {
    this.fetchCards();
  });

}

  constructor(private cardService: CardsService, private http: HttpClient) {}
    usunKarte(cardId: number) {
    this.cardService.deleteCard(cardId).subscribe(() => {
      this.fetchCards();
    });
    }
  textValue = '2';
  specificId: number = -1;
  changeLimit(cardId: number, limit: string, maxTasksLimit: number) {
    
    let kolumna = this.data.find((card: Card) => card.id === cardId);
    let limit2 = parseInt(limit);
    if (kolumna) {
      if (limit2 < kolumna?.tasks.length) {
        this.specificId = cardId;
      }
    }
    if (limit2 < 0) {
     this.specificId = cardId;

    }

    setInterval(() => {
      this.specificId = -1;
    }, 3000);

    this.cardService.changeLimit(cardId, limit2).subscribe(() => {
    });
  }
  

  usunTask(taskId: number, cardId: number) {
    this.cardService.deleteTask(taskId, cardId).subscribe(() => {
      this.fetchCards();
    });
  }

  cardName = '';
  dodajKarte(cardName: string) {
    const card: Card = {id: -1, name: cardName, maxTasksLimit: 5, tasks: [] };
    this.cardService.postCard(card).subscribe((card: Card) => {
      console.log(card);
      this.fetchCards();

    });

  }

  data!: Card[];
  //private cardService = inject(CardsService);

  value = '';

  onEnter(value: string, card_id: number) {
    this.cardService.getOneCard(card_id).subscribe((card: Card) => {
      if (card.tasks.length >= card.maxTasksLimit) {
        this.specificId = card_id;
        setInterval(() => {
          this.specificId = -1;
        }, 3000);
        return;
      }else{
        this.cardService.putTask(value, card_id).subscribe(() => {
          this.fetchCards();
        });
        this.value = value;
        console.log(this.value + " " + card_id);
      }
    });
  }

  ngOnInit(): void{
    this.fetchCards();
  }
  fetchCards(){
    this.cardService.getCards().subscribe((cards: Card[])=>{
      this.data = cards;
    });
  }

}
