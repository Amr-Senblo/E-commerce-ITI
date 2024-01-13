import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../models/iuser';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { IReview } from '../../models/ireview';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers:[UserService],
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent implements OnInit{
  @Input() userID!:number;
  @Input() productID!:number;
  @Output() reviewCreated: EventEmitter<IReview[]> = new EventEmitter<IReview[]>();

  user!:IUser;
  myForm: FormGroup;
  @Output() newReview!:IReview;

  reviewsOfProduct:IReview[]=[];

  constructor(private userService:UserService,private reviewService:ReviewService,private route:ActivatedRoute){
    this.route.params.subscribe( (params) => {
          this.productID = params['id'];  //get product id
          console.log(this.productID)
    })
    this.myForm= new FormGroup(
      {
        comment:new FormControl(null, Validators.required),
        user:new FormControl(this.userID),
        productId:new FormControl(this.productID),
        rating:new FormControl(4, [Validators.required, Validators.min(1),Validators.max(5)]),//static rating until handling rating star
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
      let user=this.userID;
      let productId= +this.productID;
      let rating=this.myForm.controls['rating'].value;

      let newReview={comment, user, productId, rating};

      this.reviewService.createReview(newReview).subscribe(
        {
          next: (createdReview) => {
            this.reviewService.getReviewsOfProduct(this.productID).subscribe({
              next:(data: IReview[])=>{
                this.reviewsOfProduct=data;
                console.log(this.reviewsOfProduct);

                this.reviewCreated.emit(this.reviewsOfProduct); // Emit the new review
              }
            });
            this.myForm.reset();
          },
          error: () => {
            console.log("error");
          }
        }
      );
  }

}
