import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IReview } from '../../models/ireview';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../../models/iuser';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { UserAuthService } from '../../services/user-auth.service';
import { LocalStrogeService } from '../../services/local-stroge.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [NgbRating, HttpClientModule, CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnChanges{
  private isFirstChange = true;
  @Input() reviews: IReview[] = [];
  users: IUser[] = [];
  UsersInOrderReviews: IUser[] = [];
  usersIds: number[] = [];
  Ratings: number[] = [];
  @Input() avgRating!:number;
  reviewAndUser!:{"review":IReview,"user":any};
  ArrayOfReviewAndUser:{"review":IReview,"user":IUser}[]=[];

  logstate!: boolean;
  currentUser?: IUser;
  currentUserName?:string;

  check:boolean = true;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private route: ActivatedRoute ,
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService
  ) {


    this.logstate = this.userAuthService.LoggedState;
      this.userAuthService.getAllUsers().subscribe((alluser) => {
        let token = this.storge.getItemFromLocalStorge('accesToken') || this.storge.getItemFromSessionStorge('accesToken');
        this.currentUser = alluser.find((user) => user.accessToken == token);
        if (this.currentUser) {
          this.userAuthService.setLoggedState = true ;
          this.currentUserName = this.currentUser.name; // Store the current user's name
          console.log(  this.currentUserName);
          this.check = true ;
          
        } else {
          this.userAuthService.setLoggedState = false;
          this.currentUserName = ''; // Clear the current user's name if not logged in
         
        }
          });


  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.isFirstChange) {
  //     this.isFirstChange = false;
  //     return;
  //   }

  //   this.reviews=this.reviews.reverse(); // the order of reviews from newest to oldest
  //   for (let review of this.reviews) {
  //     this.Ratings.push(review.rating);
  //     this.usersIds.push(review.user);
  //   }

  //   for (let userID of this.usersIds) {
  //     this.userService.getUser(userID).subscribe(user => {
  //       this.UsersInOrderReviews.push(user);
  //     });
  //   }
  //   this.avgRating = this.Ratings.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue;
  //   }, 0) / this.Ratings.length;
  // }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFirstChange) {
      this.isFirstChange = false;
      return;
    }
    this.reviews=this.reviews.reverse(); // Reverse the array

    console.log("reviews",this.reviews)
    for (let review of this.reviews) {
      this.Ratings.push(review.rating);
      console.log("review raiting  is : ",review.rating);
      
      this.usersIds.push(review.user);
    }
    let users = this.usersIds.map(value => `id=${value}`);
    let usersString = users.join('&');
    this.userService.getCustomUsers(usersString).subscribe({
      next: (res) => {
        this.users = res;
        for (let review of this.reviews) {
          if (this.usersIds.includes(review.user))
            this.UsersInOrderReviews.push(this.users.filter(user => user.id === review.user)[0]);
        }
        console.log("users in order review : ", this.UsersInOrderReviews);

      }
    })

    this.avgRating = this.Ratings.reduce((accumulator, currentValue) => {

      return accumulator + currentValue;
    }, 0) / this.Ratings.length;

  }

}
