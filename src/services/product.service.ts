import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concat, map } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  DB="http://localhost:3000/products";

  constructor(private http:HttpClient) { }
  getProducts()
  {
    return this.http.get<IProduct[]>(this.DB);
  }
  getProduct(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.get<IProduct>(url);
  }

  createProduct(data:{}){
    return this.http.post<IProduct>(this.DB,data);
  }
  updateProduct(id:number,data:{})
  {
    let url= `${this.DB}/${id}`;
    return this.http.put<IProduct>(url,data);
  }
  deleteProduct(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.delete<IProduct>(url);
  }

  getProductsOfCategory(categoryId: number) {
    let url =`${this.DB}?category=${categoryId}`;
    return this.http.get<IProduct[]>(url)
  }

  getProduct4(categoryId: number) {
    let url =`${this.DB}?category=${categoryId}&_page=1&_limit=4`;
    return this.http.get<IProduct[]>(url)
  }
}
