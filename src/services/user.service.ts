import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { environment } from '../environments/environment';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private http: HttpClient) {}
  DB = `${environment.apiUrl}/users`;
  getUsers() {
    return this.http.get<IUser[]>(this.DB);
  }
  getUser(id: number) {
    let url = `${this.DB}/${id}`;
    return this.http.get<IUser>(url);
  }
  getCustomUsers(usersIds: string) {
    let url = `${this.DB}?${usersIds}`;
    return this.http.get<IUser[]>(url);
  }
  createUser(data: {}) {
    return this.http.post<IUser>(this.DB, data);
  }
  updateWishlistForUser(userid: number, wishArray: number[]):Observable<IUser> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    console.log(headers);
    console.log(JSON.stringify({ whistlist: wishArray }));
    // const x = this.http.
    // console.log('ereen', await this.http.patch('http://localhost:3000/users/2',{}).subscribe());
    // console.log('{"wishlist": [1]}');
   return this.http.patch<IUser>(
      `${this.DB}/${userid}`,
      { wishlist: wishArray },
      this.options
    );
  }
  updateUser(id: number, data: {}) {
    let url = `${this.DB}/${id}`;
    return this.http.put<IUser>(url, data);
  }
  deleteUser(id: number) {
    let url = `${this.DB}/${id}`;
    return this.http.delete<IUser>(url);
  }
}
