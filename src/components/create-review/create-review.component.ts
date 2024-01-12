import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../models/iuser';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../models/ireview';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, NgbRatingModule],
  providers:[UserService],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent implements OnInit{
  // @Input() userID!:number;
  userID: number = 1; //static until the guard finish
  @Input() productID!:number;
  @Output() reviewCreated: EventEmitter<IReview[]> = new EventEmitter<IReview[]>();

  user!:IUser;
  myForm: FormGroup;
  @Output() newReview!:IReview;
  selectedRating:number = 1; // Initial value

  reviewsOfProduct:IReview[]=[];

  constructor(private userService:UserService,private reviewService:ReviewService,private route:ActivatedRoute){
    this.route.params.subscribe( (params) => {
          this.productID = params['id'];  //get product id
          console.log(this.productID)
    })
    this.myForm= new FormGroup(
      {
        comment:new FormControl(null, Validators.required)
      });
  }

  ngOnInit(): void {
    this.userService.getUser(this.userID).subscribe({
      next:(data)=> {
        this.user=data
        console.log(this.user);
      },
      error:()=>console.log("error")
    })
  }
  checkUser(){
    if(this.user === null)
    return ;
  }
  send(){
      let comment=this.myForm.controls['comment'].value;
      let user= +this.userID;
      let productId= +this.productID;
      let rating=this.selectedRating;

      let newReview={comment, user, productId, rating};

      this.reviewService.createReview(newReview).subscribe(
        {
          next: (createdReview) => {
            this.reviewService.getReviewsOfProduct(this.productID).subscribe({
              next:(data:any)=>{
                this.reviewsOfProduct=data;
                console.log(this.reviewsOfProduct);
                this.reviewCreated.emit(this.reviewsOfProduct); // Emit the new review
              }
            });
            this.myForm.reset();
            this.selectedRating=1;
          },
          error: () => {
            console.log("error");
          }
        }
      );
  }

  onRatingChange(newRating: number) {
    console.log('New rating:', newRating);
  }
}
