import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  // getSearchResult(search: string) {
  //   return this.http.get<IProduct[]>(`${this.url}/products?q=${search}`);
  // }

  getSearchResult(search: string) {
    return this.http.get<IProduct[]>(`${this.url}/products`, {
      params: { q: search },
    });
  }
}
