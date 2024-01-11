import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { IproductBuyed } from '../models/iproduct-buyed';
import { ICart } from '../models/icart';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomCartService {
  urlProduct = `${environment.apiUrl}/products`;
  urlcart =` ${environment.apiUrl}/carts`;
  constructor(private http: HttpClient) { }
  getCartProducts(productsIds: string) {
    return this.http.get<IProduct[]>(`${this.urlProduct}?${productsIds}`)
  }
  editCartProducts(CartId: number, productsArray: IproductBuyed[]) {
    return this.http.patch<ICart>(`${this.urlcart}/${CartId}`, { "products": productsArray })
  }
}
