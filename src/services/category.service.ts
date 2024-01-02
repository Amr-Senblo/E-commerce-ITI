import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  DB="http://localhost:3000/categories";
  getCategories()
  {
    return this.http.get<ICategory[]>(this.DB);
  }
  getCategory(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.get<ICategory>(url);
  }
  createCategory(data:{}){
    return this.http.post<ICategory>(this.DB,data);
  }
  updateCategory(id:number,data:{})
  {
    let url= `${this.DB}/${id}`;
    return this.http.put<ICategory>(url,data);
  }
  deleteCategory(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.delete<ICategory>(url);
  }
}
