import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import { ProductsOfCategoryService } from '../../services/products-of-category.service';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { IproductBuyed } from '../../models/iproduct-buyed';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ProductComponent],
  providers: [ProductService, CartService, ProductsOfCategoryService, CustomCartService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnChanges {
  private isFirstChange = true;
  cartId = 1;
  productsInCart: IproductBuyed[] = [];
  productId = 0;
  @Input() product: IProduct = <IProduct>{};
  constructor(private CartCustomService: CustomCartService, private cartService: CartService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFirstChange) {
      this.isFirstChange = false;
      return;
    }
    this.productId = this.product.id;
  }
  AddToCart() {
    this.cartService.getCart(this.cartId).subscribe({
      next: (value) => {
        this.productsInCart = value.products;
        this.productsInCart.push({ id: this.productId, quantity: 1 })
        this.CartCustomService.editCartProducts(this.cartId, this.productsInCart).subscribe();
      },
      error: (err) => console.log(err)
    })
  }
}

