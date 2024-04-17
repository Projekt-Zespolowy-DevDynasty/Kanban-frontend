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



}
