import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Card } from "../models/card.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CardsService {
    //private http = inject(HttpClient)
    constructor(private http: HttpClient) { }


    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(`${environment.backendUrl}/card/all`);
    }
    getOneCard(cardId: number): Observable<Card> {
      return this.http.get<Card>(`${environment.backendUrl}/card/${cardId}`);
    }
    postCard(card: Card): Observable<Card> {
        return this.http.post<Card>(`${environment.backendUrl}/card/add`, card);
    }
    deleteTask(taskId: number, cardId: number): Observable<any> {
        return this.http.delete(`${environment.backendUrl}/card/${cardId}/task/${taskId}`);
    }
    putTask(name: string, cardId: number): Observable<any> {
        return this.http.put(`${environment.backendUrl}/card/addtask/${cardId}`, name);
    }
    deleteCard(cardId: number): Observable<any> {
        return this.http.delete(`${environment.backendUrl}/cards/${cardId}`);
    }
    changeLimit(cardId: number, limit: number): Observable<any> {
        return this.http.put(`${environment.backendUrl}/card/${cardId}/maxTasksLimit`,limit);
    }
}
