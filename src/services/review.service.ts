import { Injectable } from '@angular/core';
import { IReview } from '../models/ireview';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  DB="http://localhost:3000/reviews";
  constructor(private http:HttpClient) { }

  getReviewsOfProduct(productID:number): Observable<IReview[]> {
    return this.http.get<IReview[]>(
      `${this.DB}?productId=${productID}`
    );
    // return this.http.get<IReview[]>(this.DB);

  }

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
  // createReview(data:{comment: string, user: number, productId: number, rating: number}) {
  //   return this.getReviews().pipe(
  //     map((reviews: IReview[]) => {
  //       const maxId = reviews.reduce((prev, curr) => (curr.id > prev ? curr.id : prev), 0);
  //       const newId = maxId + 1;
  //       const reviewWithId: IReview = {
  //         id: newId,
  //         user: data.user, // Replace with the actual user ID
  //         productId: data.rating, // Replace with the actual product ID
  //         rating: data.rating,
  //         comment: data.comment,
  //         createdAt: '',
  //         updatedAt: '',
  //         // ...data
  //       };
  //       return reviewWithId;
  //     }),
  //     map((reviewWithId: IReview) => this.http.post<IReview>(this.DB, reviewWithId))
  //   );
  // }
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
