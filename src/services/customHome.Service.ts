import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class customHomeService {
  url = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  getProduct4(categoryId: number) {
    return this.http.get<IProduct[]>(`${this.url}/products?category=${categoryId}&_page=1&_limit=4`)
  }
}
