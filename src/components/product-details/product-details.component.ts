import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class ProductDetailsComponent implements OnInit {
  cartId = 1;
  productsInCart: IproductBuyed[] = [];
  ID = 0;
  p: any;
  products: IProduct[] = []
  constructor(private CartCustomService: CustomCartService, private cartService: CartService, private myService: ProductService, myActivated: ActivatedRoute) {
    this.ID = parseInt(myActivated.snapshot.params["id"]);
    // console.log("ID : " + this.ID);
  }
  ngOnInit(): void {
    this.myService.getProduct(this.ID).subscribe({
      next: (data) => {
        // console.log(data)
        this.p = data;
      },
      error: () => { console.log("error occured") }
    })

    this.myService.getProducts().subscribe({
      next: (data) => {
        // console.log(data)
        this.products = data.slice(0, 8)
      },
      error: () => { console.log("Error") }
    })
  }
  AddToCart() {
    this.cartService.getCart(this.cartId).subscribe({
      next: (value) => {
        this.productsInCart = value.products;
        this.productsInCart.push({ id: this.ID, quantity: 1 })
        this.CartCustomService.editCartProducts(this.cartId, this.productsInCart).subscribe();
      },
      error: (err) => console.log(err)
    })
  }
}

