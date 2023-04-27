import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from './model/consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http:HttpClient) { }

  getAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>('/api/consumers');
  }

  findConsumers(search:string):Observable<Consumer[]>{
    return this.http.get<Consumer[]>(`/api/consumers?q=${search}`);
  }

  save(consumer:Consumer):Observable<any>{
    return this.http.post<any>('/api/consumers', consumer);
  }
}
