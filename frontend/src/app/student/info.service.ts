import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  url:any="http://localhost:8080/";

  constructor(public http:HttpClient) { }

  public login(data:any)  : Observable<any>
  {
    return this.http.post<any>(`${this.url}login`,data);
  }
  public register(data:any) : Observable<any>
  {
    return this.http.post<any>(`${this.url}register`,data);
  }
  public editDetails(data:any,id:any) : Observable<any>{
    return this.http.put<any>(`${this.url}${id}/edit`,data);
  }
  public getStu(id:any) : Observable<any>{
    return this.http.get(`${this.url}${id}`);
  }
  public getMarks(id:any){
    return this.http.get(`${this.url}${id}/marks`);
  }
}
