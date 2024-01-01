import { Injectable } from '@angular/core';
import { IReview } from '../models/ireview';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  DB="http://localhost:3000/reviews";
  constructor(private http:HttpClient) { }

  getReviews()
  {
    return this.http.get<IReview[]>(this.DB);
  }
  getReview(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.get<IReview>(url);
  }
  createReview(data:{}){
    return this.http.post<IReview>(this.DB,data);
  }
  updateReview(id:number,data:{})
  {
    let url= `${this.DB}/${id}`;
    return this.http.put<IReview>(url,data);
  }
  deleteReview(id:number)
  {
    let url= `${this.DB}/${id}`;
    return this.http.delete<IReview>(url);
  }}
