import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "../models/card.model";

@Injectable({
    providedIn: 'root'
})
export class CardsService {
    private http = inject(HttpClient)

    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>('http://localhost:8080/api/card/all');
    }
    postCard(card: Card): Observable<Card> {
        return this.http.post<Card>('http://localhost:8080/api/card/add', card);
    }
    deleteTask(taskId: number, cardId: number): Observable<any> {
        return this.http.delete(`http://localhost:8080/api/tasks/${taskId}/${cardId}`);
    }
    putTask(name: string, cardId: number): Observable<any> {
        return this.http.put(`http://localhost:8080/api/card/addtask/${cardId}`, name);
    }
    deleteCard(cardId: number): Observable<any> {
        return this.http.delete(`http://localhost:8080/api/cards/${cardId}`);
    }
}