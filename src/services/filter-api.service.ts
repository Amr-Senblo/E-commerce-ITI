import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterAPIService {
  constructor(private httpClient: HttpClient) {}
  getProductsByCategoryId(catId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${environment.apiUrl}/products?category=${catId}`
    );
  }
  getProdcutsByBrandForCategory(
    catId: number,
    brand: string[]
  ): Observable<IProduct[]> {
    let brans: string = 'brand=' + brand.join('&brand=');
    return this.httpClient.get<IProduct[]>(
      `${environment.apiUrl}/products?category=${catId}&${brans}`
    );
  }
}
