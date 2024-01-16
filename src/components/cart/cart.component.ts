import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { CommonModule } from '@angular/common';
import { IproductBuyed } from '../../models/iproduct-buyed';
import { UserAuthService } from '../../services/user-auth.service';
import { IUser } from '../../models/iuser';
import { LocalStrogeService } from '../../services/local-stroge.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCartComponent, CommonModule],
  providers: [CartService, CustomCartService,UserAuthService, UserService,LocalStrogeService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartId: number = 0;
  productsBuyedArray: IproductBuyed[] = []
  productsIds: number[] = []
  productsQuantity: number[] = []
  products: IProduct[] = []
  logstate!: boolean;
  currentUser?: IUser;
  // currentUserName?:string;
  UserId?:number;

  constructor(
    private getProductsService: CustomCartService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService,
    private userService:UserService
    )
    {
          this.route.params.subscribe(params => {
          this.cartId = params['id'];
          })
            this.logstate = this.userAuthService.LoggedState;
            this.userAuthService.getAllUsers().subscribe((alluser) => {
            let token = this.storge.getItemFromLocalStorge('accesToken') || this.storge.getItemFromSessionStorge('accesToken');
            this.currentUser = alluser.find((user) => user.accessToken == token);
            if (this.currentUser) {
              this.userAuthService.setLoggedState = true ;
              this.UserId = this.currentUser.id; // Store the current user's id
              console.log(  this.UserId);

            } else {
              this.userAuthService.setLoggedState = false;
              // this.UserId = ''; // Clear the current user's name if not logged in
            }
          });
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
