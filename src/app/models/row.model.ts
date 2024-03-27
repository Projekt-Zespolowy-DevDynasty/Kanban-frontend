import { Card } from "./card.model";

export interface Row{
    id: number,
    name: string,
    position: number,
    cardsinrow: Card[]
   
}