import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  //private http = inject(HttpClient)
  constructor(private http: HttpClient) {}

  //backendUrl: 'http://localhost:8080/api/card'

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
    return this.http.delete(
      `${environment.backendUrl}/card/${cardId}/task/${taskId}`,
    );
  }
  putTask(name: string, cardId: number): Observable<any> {
    return this.http.put(`${environment.backendUrl}/addtask/${cardId}`, name);
  }
  deleteCard(cardId: number): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/card/${cardId}`);
  }
  changeLimit(cardId: number, limit: number): Observable<any> {
    return this.http.put(
      `${environment.backendUrl}/card/${cardId}/maxTasksLimit`,
      limit,
    );
  }
  moveTasks(
    sourceCardId: number,
    taskId: number,
    destinationCardId: number,
    index: number,
  ): Observable<any> {
    return this.http.put(
      `${environment.backendUrl}/card/${sourceCardId}/move-task/${taskId}/to-card/${destinationCardId}/at-index/${index}`,
      null,
    );
  }
  zmainaNazwyKarty(cardId: number, newName: string): Observable<any> {
    return this.http.put(
      `${environment.backendUrl}/card/${cardId}/edit-name`,
      newName,
    );
  }
  zmianaNazwyTaska(taskId: number, newNameTask: string): Observable<any> {
    return this.http.put(
      `${environment.backendUrl}/task/${taskId}/rename`,
      newNameTask,
    );
  }
  przesunKarte(sourceId: number, destinationId: number): Observable<any> {
    return this.http.put(
      `${environment.backendUrl}/card/${destinationId}/position/${sourceId}`,
      sourceId,
    );
  }
}
