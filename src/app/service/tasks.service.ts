import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Row } from '../models/row.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  //http://localhost:8080/api

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${environment.backendUrl}/task/${taskId}`);
  }
  changeColorTask(taskId: number, color: string): Observable<Task> {
    return this.http.put<Task>(
      `${environment.backendUrl}/task/changecolor/${taskId}`,
      color,
    );
  }
}
