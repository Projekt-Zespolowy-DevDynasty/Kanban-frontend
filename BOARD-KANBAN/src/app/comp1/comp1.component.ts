import { Component, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { HttpClient } from '@angular/common/http';
import { CardsService } from '../service/cards.service';

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [],
  providers: [CardsService],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.scss'
})
export class Comp1Component {


  usunTask(taskId: number) {
    this.cardService.deleteTask(taskId).subscribe(() => {
      this.fetchCards();
    });
  }

  cardName = '';
  dodajKarte(cardName: string) {
    const card: Card = {id: -1, name: cardName, tasks: [] };
    this.cardService.postCard(card).subscribe((card: Card) => {
      console.log(card);
      this.fetchCards();
    });
  }


  data!: Card[];
  http = inject(HttpClient)
  private cardService = inject(CardsService);

  value = '';

  onEnter(value: string, card_id: number) {
    this.cardService.postTask(value, card_id).subscribe(() => {
      this.fetchCards();
    });
    this.value = value;
    console.log(this.value + " " + card_id);
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