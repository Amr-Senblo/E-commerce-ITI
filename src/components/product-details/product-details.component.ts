import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { IproductBuyed } from '../../models/iproduct-buyed';
import Swal from 'sweetalert2';
import { ICart } from '../../models/icart';

//import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink, ProductComponent],
  providers: [ProductService, CartService, CustomCartService],
  templateUrl: './product-details.component.html',
  template: `
    <button (click)="incrementCounter()">Increment Counter</button>
  `
,
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges {
  private isFirstChange = true;
  cartId = 1;
  productsInCart: IproductBuyed[] = [];
  productId = 0;
  @Input()counter =0;
  @Input() product: IProduct = <IProduct>{};

  constructor(
    private CartCustomService: CustomCartService,
    private cartService: CartService
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
   
    // Increment the counter
  

  this.incrementCounter();
    
  }

  // @Output() counterChanged: EventEmitter<number> = new EventEmitter<number>();

  // incrementCounter() {
  //   this.counterChanged.emit(this.counter);
  //   this.counter++;
  // }


  incrementCounter() {
    // this.cartService.incrementCounter();
    // console.log("counter2 : ",this.cartService.incrementCounter());

    let counter = localStorage.getItem('counter');
  if (counter) {
    this.counter = parseInt(counter) + 1;
  } else {
    this.counter = 1;
  }
  localStorage.setItem('counter', this.counter.toString());

   console.log("counter1: ", this.counter);
    
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



  //update image to be dynamic
  prodct = {
    imageCover: '',
    images: []
  };

  fetchProduct(): void {
    
    this.prodct = {
      imageCover: this.prodct.imageCover,
      images: [this.prodct.images[0],this.prodct.images[1] , this.prodct.images[2]]
    };
  }


  updateImage(imageUrl: string): void {
    this.product.imageCover = imageUrl;
  }

  ngOnInit(): void {
    this.fetchProduct();
  }


  zoomOptions = {
    zoomFactor: 3,
    container: 'container-element'
  };
}
