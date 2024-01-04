import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { IproductBuyed } from '../../models/iproduct-buyed';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule, ProductCartComponent, CommonModule],
  providers: [CartService, CustomCartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartId: number = 0;
  productsBuyedArray: IproductBuyed[] = []
  productsIds: number[] = []
  productsQuantity: number[] = []
  products: IProduct[] = []
  constructor(private getProductsService: CustomCartService, private cartService: CartService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter
      this.cartId = params['id'];
      //console.log(this.cartId)
    })
  }
  ngOnInit(): void {
    this.cartService.getCart(this.cartId).subscribe({
      next: (data) => {
        //console.log(data);
        this.productsBuyedArray = data.products;
        for (let product of data.products) {
          this.productsIds.push(product.id);
          this.productsQuantity.push(product.quantity)
        }
        let productss = this.productsIds.map(value => `id=${value}`);
        let productsString = productss.join('&');
        this.getProductsService.getCartProducts(productsString).subscribe({
          next: (value) => {
            this.products = value;
          },
          error: error => console.log(error)
        })
      },
      error: error => console.log(error)
    })
  }
  onAction(value: IproductBuyed) {
    if (value.quantity === 0) {
      this.productsBuyedArray = this.productsBuyedArray.filter(item => item.id !== value.id);
      // console.log(this.productsBuyedArray);
      this.getProductsService.editCartProducts(this.cartId, this.productsBuyedArray).subscribe();
    } else {
      this.productsBuyedArray = this.productsBuyedArray.map(item => {
        if (item.id === value.id)
          item.quantity = value.quantity
        return item
      });
      // console.log(this.productsBuyedArray);
      this.getProductsService.editCartProducts(this.cartId, this.productsBuyedArray).subscribe();
    }
  }

}
