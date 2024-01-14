import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../models/icart';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  DB=`${environment.apiUrl}/carts`;
  constructor(private http:HttpClient) { }

  getCarts()
  {
    return this.http.get<ICart[]>(this.DB);
  }
  getCart(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.get<ICart>(url);
  }
  createCart(data:{}){
    return this.http.post<ICart>(this.DB,data);
  }
  updateCart(id:number,data:{})
  {
    let url= `${this.DB}/${id}`;
    return this.http.put<ICart>(url,data);
  }
  deleteCart(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.delete<ICart>(url);
  }
}
