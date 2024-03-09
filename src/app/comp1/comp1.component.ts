import { Component, inject } from '@angular/core';
import { Card } from '../models/card.model';
import { CardsService } from '../service/cards.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [],
  providers: [CardsService],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.scss'
})
export class Comp1Component {

  constructor(private cardService: CardsService, private http: HttpClient) {}
    usunKarte(cardId: number) {
    this.cardService.deleteCard(cardId).subscribe(() => {
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
    const card: Card = {id: -1, name: cardName, tasks: [] };
    this.cardService.postCard(card).subscribe((card: Card) => {
      console.log(card);
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