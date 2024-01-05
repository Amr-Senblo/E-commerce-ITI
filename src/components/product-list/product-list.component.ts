import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { ProductsOfCategoryService } from '../../services/products-of-category.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,

  imports: [ProductComponent, HttpClientModule, CommonModule],
  providers: [ProductService, ProductsOfCategoryService],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  categoryId!: number;
  products!: IProduct[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsOfCategoryService: ProductsOfCategoryService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.productsOfCategoryService
        .getProductOfCategory(this.categoryId)
        .subscribe((data) => {
          this.products = data;
          console.log(this.products);
        });
    });
  }
}
