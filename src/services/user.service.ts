import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  DB="http://localhost:3000/users";
  getUsers()
  {
    return this.http.get<IUser[]>(this.DB);
  }
  getUser(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.get<IUser>(url);
  }
  createUser(data:{}){
    return this.http.post<IUser>(this.DB,data);
  }
  updateUser(id:number,data:{})
  {
    let url= `${this.DB}/${id}`;
    return this.http.put<IUser>(url,data);
  }
  deleteUser(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.delete<IUser>(url);
  }
}
