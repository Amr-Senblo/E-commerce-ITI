import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { IproductBuyed } from '../../models/iproduct-buyed';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent, CommonModule, RouterLink],
  providers: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartId: number = 0;
  productsBuyedArray: IproductBuyed[] = [];
  productsIds: number[] = [];
  productsQuantity: number[] = [];
  products: IProduct[] = [];
  totalPrice = 0;
  productsString!: string;
  constructor(private getProductsService: CustomCartService, private cartService: CartService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter
      this.cartId = params['id'];
      //console.log(this.cartId)
    })
  }
  ngOnInit(): void {
    this.products = [];
    this.cartService.getCart(this.cartId).subscribe({
      next: (data) => {
        //console.log(data);
        this.productsBuyedArray = data.products;
        for (let product of data.products) {
          this.productsIds.push(product.id);
          this.productsQuantity.push(product.quantity)
        }
        if (this.productsIds.length == 0) {
          this.productsIds.push(-1);
          let productss = this.productsIds.map(value => `id=${value}`);
          this.productsString = productss.join('&');
        }
        else {
          let productss = this.productsIds.map(value => `id=${value}`);
          this.productsString = productss.join('&');
        }
        this.getProductsService.getCartProducts(this.productsString).subscribe({
          next: (value) => {
            this.totalPrice = 0;
            this.products = value;
            for (let i = 0; i < this.products.length; i++) {
              this.totalPrice += +this.products[i].price * +this.productsQuantity[i];
            }
            this.getProductsService.editCartTotalPrice(this.cartId, this.totalPrice).subscribe();
            // console.log(this.totalPrice);
          },
          error: error => console.log(error)
        })
      },
      error: error => console.log(error)
    })
  }
  onAction(value: [IproductBuyed, number, number]) {
    if (value[0].quantity === 0) {
      this.productsBuyedArray = this.productsBuyedArray.filter(item => item.id !== value[0].id);
      this.getProductsService.editCartProducts(this.cartId, this.productsBuyedArray).subscribe();
      this.totalPrice = this.totalPrice - value[1] * value[2];
      //console.log(this.totalPrice);
      this.getProductsService.editCartTotalPrice(this.cartId, this.totalPrice).subscribe();
    } else {
      this.productsBuyedArray = this.productsBuyedArray.map(item => {
        if (item.id === value[0].id)
          item.quantity = value[0].quantity;
        return item
      });

      if (value[0].quantity > value[1]) {
        this.totalPrice = this.totalPrice + value[2];
      }
      else {
        this.totalPrice = this.totalPrice - value[2]
      }
      // console.log(this.totalPrice);
      this.getProductsService.editCartProducts(this.cartId, this.productsBuyedArray).subscribe();
      this.getProductsService.editCartTotalPrice(this.cartId, this.totalPrice).subscribe();
    }
  }

}
