import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Row } from '../models/row.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser( user: User): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl}/users/add`, user);
  }
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendUrl}/users/get`);
  }
  addUserToTask( userId: number, taskId: number): Observable<User> {
    return this.http.post<User>(`${environment.backendUrl}/users/add/${userId}/assignToTask/${taskId}`, null);
  }
  
  deleteUserFromTask(userId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/users/${userId}/removeFromTask/${taskId}`, {responseType: 'text' as 'json'});
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendUrl}/users/${userId}`);
  }
  AllUserInTask(taskId: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendUrl}/users/${taskId}/usersAssigned`);
  }
  AllUserNotInTAsk(taskId: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendUrl}/users/${taskId}/usersNotAssigned`);
  }

  assignUserToTask(userId: number, taskId: number): Observable<string> {
    return this.http.post<string>(`${environment.backendUrl}/users/${userId}/assignToTask/${taskId}`, 
    null, 
    {responseType: 'text' as 'json'});
  }
  setLimitUser(userId: number , limit: number): Observable<String> {
    return this.http.put<String>(`${environment.backendUrl}/users/${userId}/setMaxTasksLimit`,limit,
    {responseType: 'text' as 'json'}
     );
  }


}