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
  data!: Card[];
  http = inject(HttpClient)
  private cardService = inject(CardsService);

  ngOnInit(): void{
    this.fetchCards();
  }
  fetchCards(){
    this.cardService.getCards().subscribe((cards: Card[])=>{
      this.data = cards;
    });
  }

}