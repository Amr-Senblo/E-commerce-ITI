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


@Component({
  selector: 'app-product-details-container',
  standalone: true,

  imports: [ProductDetailsComponent,
    BreadCrumbComponent,
    HttpClientModule,
    ProductsArrayComponent,
    ReviewsComponent,
    ProductComponent,
    CreateReviewComponent
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

  constructor(private reviewService:ReviewService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter
      this.productId = +params['id'];
      //console.log(this.cartId)
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
        this.productService.getProduct4(value.category).subscribe({
          next: (products) => {
            this.categoryProducts = products.filter(product => product.id !== this.currentProduct.id)
          }
        })
      }
    })
  }

  handleReviewCreated(createdReview: IReview[]) {
    if (this.reviews) { // Check if reviews are available
      // this.reviews.push(createdReview);
      this.reviews=createdReview;
      // this.changeDetectorRef.detectChanges(); // Trigger change detection
    }
  }


}
