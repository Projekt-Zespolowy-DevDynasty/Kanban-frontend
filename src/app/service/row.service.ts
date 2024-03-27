import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Row } from "../models/row.model";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RowService{
    constructor(private http: HttpClient) { }

    //http://localhost:8080/api

    addColumnInRow(name: string): Observable<Row> {
        return this.http.post<Row>(`${environment.backendUrl}/row/add-column`, name);
    }
    getAll(): Observable<Row[]> {
        return this.http.get<Row[]>(`${environment.backendUrl}/row/all`);
    }
    addRow(): Observable<Row> {
        return this.http.post<Row>(`${environment.backendUrl}/row/add`, null);
    }
    deleteRow(rowId: number): Observable<Row>{
        return this.http.delete<Row>(`${environment.backendUrl}/row/${rowId}`);
    }
    moveUpRow(rowId: number): Observable<Row>{
        return this.http.put<Row>(`${environment.backendUrl}/row/${rowId}/move-up`, rowId);
    }
    moveDownRow(rowId: number): Observable<Row>{
        return this.http.put<Row>(`${environment.backendUrl}/row/${rowId}/move-down`, rowId);
    }
    deleteColumnInRow(columnPosition: number): Observable<Row>{
        return this.http.delete<Row>(`${environment.backendUrl}/row/remove-column/${columnPosition}`);
    }
    getByPosition(rowPosition: number): Observable<Row>{
        return this.http.get<Row>(`${environment.backendUrl}/row/${rowPosition}`);
    }
    getRowById(rowId: number): Observable<Row>{
        return this.http.get<Row>(`${environment.backendUrl}/row/getrowbyid/${rowId}`);
    }
 

}