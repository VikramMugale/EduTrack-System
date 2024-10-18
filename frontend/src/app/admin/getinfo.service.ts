import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetinfoService {
  url:any="http://localhost:8080/admin";
  constructor(public http:HttpClient) { }

  students(){
    return this.http.get<any>(`${this.url}/students`);
  }
  edit(data:any,id:any){
     return this.http.put<any>(`${this.url}/${id}/edit`,data);
  }
  delete(id:any){
     return this.http.delete(`${this.url}/${id}/delete`);
  }
}
