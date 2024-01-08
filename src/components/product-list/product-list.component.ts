import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductsArrayComponent } from '../products-array/products-array.component';

@Component({
  selector: 'app-product-list',
  standalone: true,

  imports: [ProductComponent, HttpClientModule, CommonModule, PaginationComponent, ProductsArrayComponent],
  providers: [ProductService, ProductService],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  category_id!: number;
  products!: IProduct[];
  constructor(
    private route: ActivatedRoute,
    private service: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category_id = +params['categoryId'];
      this.service
        .getProductsOfCategory(this.category_id)
        .subscribe(
        {
          next:(data:IProduct[])=>{
            this.products=data
          },
          error:()=>"error"
        }

        );
    });
  }
}
