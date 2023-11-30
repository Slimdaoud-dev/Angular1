import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  private url = 'http://127.0.0.1:3000/article/';

  create(article :any){
    return this.http.post(this.url+"create",article);
   }

   getByAutherId(id:any){
    return this.http.get(this.url+"getByIdAuthor/"+id);

   }
   getallarticles(){
    return this.http.get(this.url+"all");
   }


   getarticlebyid(id:any){
    return this.http.get(this.url+"getById/"+id);
  }

}
