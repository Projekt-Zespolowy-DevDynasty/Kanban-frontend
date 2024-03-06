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
        return this.http.get<Card[]>('http://localhost:8080/api/test');
    }
}