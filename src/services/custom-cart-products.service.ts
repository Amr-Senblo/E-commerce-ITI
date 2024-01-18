import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { IproductBuyed } from '../models/iproduct-buyed';
import { ICart } from '../models/icart';
import { environment } from '../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomCartService {
  urlProduct = `${environment.apiUrl}/products`;
  urlcart = ` ${environment.apiUrl}/carts`;
  static cartCounter$ = new BehaviorSubject(0)
  constructor(private http: HttpClient) { }
  getCartProducts(productsIds: string) {
    return this.http.get<IProduct[]>(`${this.urlProduct}?${productsIds}`)
  }
  getCartContent(id: number) {
    let url = `${this.urlcart}/${id}`;
    return this.http.get<ICart>(url).pipe(
      tap((value) => {
        CustomCartService.cartCounter$.next(value.products.length);
        console.log(CustomCartService.cartCounter$)
      })
    );
  }
  editCartProducts(CartId: number, productsArray: IproductBuyed[]) {
    return this.http.patch<ICart>(`${this.urlcart}/${CartId}`, { "products": productsArray }).pipe(
      tap((value) => {
        CustomCartService.cartCounter$.next(value.products.length);
      })
    )
  }
  //Edit
  editCartTotalPrice(CartId: number, totalPrice: number) {
    return this.http.patch<ICart>(`${this.urlcart}/${CartId}`, { "totalPrice": totalPrice })
  }
}
