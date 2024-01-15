import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { environment } from '../environments/environment';
import { IOrder } from '../models/iorder';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
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
  updateUser(id: number, data: {}) {
    let url = `${this.DB}/${id}`;
    return this.http.put<IUser>(url, data);
  }
  updateUserOrders(id: number, orders: IOrder[]) {
    let url = `${this.DB}/${id}`;
    return this.http.patch<IUser>(url, { "orders": orders });
  }
  deleteUser(id: number) {
    let url = `${this.DB}/${id}`;
    return this.http.delete<IUser>(url);
  }
}
