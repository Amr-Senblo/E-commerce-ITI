import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { IproductBuyed } from '../../models/iproduct-buyed';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, ProductComponent, NgbRating],
  providers: [ProductService, CartService, CustomCartService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges {
  private isFirstChange = true;
  cartId = 1;
  productsInCart: IproductBuyed[] = [];
  productId = 0;
  @Input() product: IProduct = <IProduct>{};
  constructor(
    private CartCustomService: CustomCartService,
    private cartService: CartService,
    private productService: ProductService
  ) {}
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
        this.productsInCart.push({ id: this.productId, quantity: 1 });
        this.CartCustomService.editCartProducts(
          this.cartId,
          this.productsInCart
        ).subscribe();
      },
      error: (err) => console.log(err),
    });
    this.showMessage('Added to cart');
  }
  x: any;

  showMessage(message: string): void {
    this.x = setInterval(() => {
      Swal.fire({
        title: message,

        icon: 'success',
      });
      this.clearMessage();
    }, 1000);
    console.log('interval work');
  }

  clearMessage(): void {
    clearInterval(this.x);
    console.log('clear work');
  }

}
