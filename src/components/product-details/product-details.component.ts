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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { CartService } from '../../services/cart.service';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { IproductBuyed } from '../../models/iproduct-buyed';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ICart } from '../../models/icart';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from '../../services/review.service';

//import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-product-details',
  standalone: true,

  imports: [RouterLink, ProductComponent, NgbRating, HttpClientModule],
  providers: [],

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges ,OnInit {
  private isFirstChange = true;
  cartId = 1;
  productsInCart: IproductBuyed[] = [];
  productId = 0;

  logstate!: boolean;
  currentUser?: IUser;
  // currentUserName?:string;
  UserId!: number;
  counter: number = 0;

  @Input() product: IProduct = <IProduct>{};
  x: any;
  @Input() rev :any;
  prodId :number =0;

  avgRating: number = 0;
  Ratings: number[] = [];

  constructor(
    private CartCustomService: CustomCartService,
    private cartService: CartService,

    private productService: ProductService,
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService,
    private userService: UserService
  ) {
    this.logstate = this.userAuthService.LoggedState;
    this.userAuthService.getAllUsers().subscribe((alluser) => {
      let token = this.storge.getItemFromLocalStorge('accesToken') || this.storge.getItemFromSessionStorge('accesToken');
      this.currentUser = alluser.find((user) => user.accessToken == token);
      if (this.currentUser) {
        this.userAuthService.setLoggedState = true;
        this.UserId = this.currentUser.id; // Store the current user's id
        console.log(this.UserId);

      } else {
        this.userAuthService.setLoggedState = false;
        // this.UserId = ''; // Clear the current user's name if not logged in
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.isFirstChange) {
      this.isFirstChange = false;

      return;
    }
    this.productId = this.product.id;

    
    

    this.avgRating = this.Ratings.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0) / this.Ratings.length;
    console.log("avg rate : " , this.avgRating)
  }


  // ngOnInit(): void {
  //   this.revService.getReview(this.prodId).subscribe({
  //     next:(data)=>{
  //        console.log(data)
  //       this.rev = data;
  //     },
  //     error:()=>{console.log(" Error")}
  //   })
  // }
  AddToCart() {

    this.cartService.getCart(this.UserId).subscribe({
      next: (value) => {
        this.productsInCart = value.products || [];

        const existingProductIndex = this.productsInCart.findIndex(
          product => product.id === this.productId
        );

        if (existingProductIndex !== -1) {
          // Product exists, increment quantity
          this.productsInCart[existingProductIndex].quantity++;
        } else {
          // Product not found, add it
          this.productsInCart.push({ id: this.productId, quantity: 1 });
        }

        // Save the updated cart after checking or adding the product
        this.CartCustomService.editCartProducts(this.UserId, this.productsInCart).subscribe();
      },
      error: (err) => console.log(err),
    });
    // this.cartService.getCart(this.UserId).subscribe({
    //   next: (value) => {
    //     this.productsInCart = value.products || [];
    //     const existingProductIndex = this.productsInCart.findIndex(
    //       product => product.id === this.productId
    //     );
    //     if(existingProductIndex !== -1){
    //       this.productsInCart[existingProductIndex].quantity++;
    //     }
    //     else{
    //       this.productsInCart = value.products;
    //       this.productsInCart.push({ id: this.productId, quantity: 1 });
    //       this.CartCustomService.editCartProducts(
    //         this.UserId,
    //         this.productsInCart
    //       ).subscribe();
    //     }

    //   },
    //   error: (err) => console.log(err),
    // });

    this.showMessage('Added to cart');

    //TO increament counter
    //   this.cartService.getCart(this.UserId).subscribe({
    //     next: (cart) => {
    //       let quantities = cart.products.map(product => product.quantity);
    //       console.log(cart.products);

    //       const totalQuantity = quantities.reduce((sum, quantity) => sum + quantity, 0);
    //       this.counter = totalQuantity;
    //     }
    // });


    // Increment the counter

    //this.incrementCounter();
  }

  // @Output() counterChanged: EventEmitter<number> = new EventEmitter<number>();

  // incrementCounter() {
  //   this.counterChanged.emit(this.counter);
  //   this.counter++;
  // }

  // incrementCounter() {
  //   // this.cartService.incrementCounter();
  //   // console.log("counter2 : ",this.cartService.incrementCounter());

  //   let counter = localStorage.getItem('counter');
  //   if (counter) {
  //     this.counter = parseInt(counter) + 1;
  //   } else {
  //     this.counter = 1;
  //   }
  //   localStorage.setItem('counter', this.counter.toString());

  //   console.log('counter1: ', this.counter);
  // }


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
  prodct = {
    imageCover: '',
    images: [],
  };

  fetchProduct(): void {
    this.prodct = {
      imageCover: this.prodct.imageCover,
      images: [
        this.prodct.images[0],
        this.prodct.images[1],
        this.prodct.images[2],
      ],
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
    container: 'container-element',
  };


 
}
