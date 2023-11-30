import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }


  private url = 'http://127.0.0.1:3000/author/';

register(author :any){
 return this.http.post(this.url+"register",author);
}

login(author :any){
  return this.http.post(this.url+"login",author);
}
isLoggedin(){
  let token = localStorage.getItem("token");
  if(token){
    return true;
  }else{
    return false;
  }
}
getAutherDataFromToken() {
  const token = localStorage.getItem("token");
  if (token) {
     const data = JSON.parse(window.atob(token.split('.')[1]))
     return data;
}

}

getAutherById(id:any){
  return this.http.get(this.url+"getById/"+id);
}
getallauthor(){
 return this.http.get(this.url+"all")
}

}

