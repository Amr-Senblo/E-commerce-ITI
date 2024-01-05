import { Component } from '@angular/core';
import { ProductsArrayComponent } from '../products-array/products-array.component';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-temp-products',
  standalone: true,
  templateUrl: './temp-products.component.html',
  styleUrl: './temp-products.component.css',
  imports: [ProductsArrayComponent],
})
export class TempProductsComponent {
  products!: IProduct[];
  catId!: number;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.activeRoute.params.subscribe((prams) => {
      this.catId = +prams['categoryId'];
      this.productService
        .getProductsOfCategory(this.catId)
        .subscribe((data) => {
          this.products = data;
        });
    });
  }
}
