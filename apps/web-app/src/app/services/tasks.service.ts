import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, retryWhen} from 'rxjs';
import {environment} from '../../environments/environment';

const API_PATH = `${environment.api}/tasks`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get(API_PATH)
  }

  update(taskId: number, status: number): Observable<any> {
    return this.httpClient.patch(`${API_PATH}/${taskId}`, {status});
  }
}
