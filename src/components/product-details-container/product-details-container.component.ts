import { Component, OnInit } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { BreadCrumbComponent } from '../bread-crumb/bread-crumb.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { IProduct } from '../../models/iproduct';
import { ProductsArrayComponent } from '../products-array/products-array.component';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-product-details-container',
  standalone: true,
  imports: [ProductDetailsComponent, BreadCrumbComponent, HttpClientModule, ProductsArrayComponent, ReviewsComponent],
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
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter
      this.productId = params['id'];
      //console.log(this.cartId)
    })

  }
  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (value) => {
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
  }
}
