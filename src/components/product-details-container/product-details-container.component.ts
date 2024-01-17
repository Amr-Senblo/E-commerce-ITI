import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { IProduct } from '../../models/iproduct';
import { ProductsArrayComponent } from '../products-array/products-array.component';

import { ReviewsComponent } from '../reviews/reviews.component';
import { ProductComponent } from '../product/product.component';
import { CreateReviewComponent } from '../create-review/create-review.component';
import { IUser } from '../../models/iuser';
import { IReview } from '../../models/ireview';
import { ReviewService } from '../../services/review.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-details-container',
  standalone: true,

  imports: [ProductDetailsComponent,
    BreadCrumbComponent,
    HttpClientModule,
    ProductsArrayComponent,
    ReviewsComponent,
    ProductComponent,
    CreateReviewComponent,
    ProductDetailsComponent,
  ],

  providers: [ProductService],
  templateUrl: './product-details-container.component.html',
  styleUrl: './product-details-container.component.css'
})

export class ProductDetailsContainerComponent implements OnInit {
  productId!: number;
  currentProduct: IProduct = <IProduct>{};
  categoryProducts: IProduct[] = [];
  breadCrumbTitles: string[] = [];
  breadCrumbLinks: string[] = [];
  @Input() reviews: IReview[] = [];
  avgRating:number=0;
  Ratings: number[] = [];

  // avgRating!:number;

  constructor(private reviewService:ReviewService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef ,

    ) {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    })

  }
  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (value) => {
        this.reviews = value.reviews || []; // Assuming product includes reviews
        console.log(this.reviews);

        this.currentProduct = value;
        this.breadCrumbTitles = ['Home', value.name];
        this.breadCrumbLinks = ["/Home", `/Category/${this.currentProduct.category}/${this.currentProduct.id}`]
        this.productService.getProductsOfCategory(value.category).subscribe({
          next: (products) => {
            this.categoryProducts = products.filter(product => product.id !== this.currentProduct.id)
          }
        })
      }
    })
    this.reviewService.getReviews().subscribe({
      next:(data)=>{
        // this.reviews=data
        let reviews: IReview[] = data;
        console.log(reviews);

        for (let review of this.reviews) {
          reviews.filter( (product)=> product.productId == this.productId);
          this.Ratings.push(review.rating);
        }
        console.log(this.Ratings);
        // this.avgRating = Math.round(this.Ratings.reduce((sum, rating) => sum + rating, 0) / this.Ratings.length);
        this.avgRating = this.Ratings.reduce((sum, rating) => sum + rating, 0) / this.Ratings.length;

        console.log("Average Rating:", this.avgRating);

      }

    });
  }

  handleReviewCreated(createdReview: IReview[])
  {
    // Check if reviews are available
      this.reviews=createdReview;
      // this.changeDetectorRef.detectChanges(); // Trigger change detection

  }



}