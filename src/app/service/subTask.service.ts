import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Row } from '../models/row.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { SubTask } from '../models/subTask.model';

@Injectable({
  providedIn: 'root',
})
export class SubTaskService {

  constructor(private http: HttpClient) {}

  //http://localhost:8080/api


  getSubTasksByTaskId(taskId: number): Observable<SubTask[]> {
    return this.http.get<SubTask[]>(`${environment.backendUrl}/subtasks/tasks/${taskId}/subtasks`);
  }

  addSubtask(name: string, taskId: number): Observable<string> {
    return this.http.post<string>(`${environment.backendUrl}/subtasks/${taskId}`, name,
    {responseType: 'text' as 'json'}
    );
  }
  deleteSubTask(subTaskId: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/subtasks/${subTaskId}`);
  }
  changeSubTaskStatus(subTaskId: number, status: boolean): Observable<void> {
    return this.http.put<void>(`${environment.backendUrl}/subtasks/${subTaskId}/finished?finished=${status}`, null);
  }

}
