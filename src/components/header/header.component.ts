import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterAPIService } from '../../services/filter-api.service';
import { UserAuthService } from '../../services/user-auth.service';
import { IUser } from '../../models/iuser';
import { LocalStrogeService } from '../../services/local-stroge.service';
import { ToastComponent } from '../toast/toast.component';

import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { CustomCartService } from '../../services/custom-cart-products.service';
import { forkJoin } from 'rxjs';
import { ICart } from '../../models/icart';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, RouterModule, FormsModule, ToastComponent],
})
export class HeaderComponent implements OnInit, OnChanges {
  counter:number =0;
  logOut() {
    this.userAuthService.logOut();
    this.toast.openSnackBar('Logged Out', '');
    this.logstate = this.userAuthService.LoggedState;
    this.currentUser = undefined;
  }
  showstate() {
    console.log(this.userAuthService.LoggedState);
  }


  //@Input() counter: number=0;
  counter: number = 0;

  isDropdownOpen = false;
  categoriesDropdown = false;
  categories: any = [];
  searchkeyword: string = '';
  @Input()names!: string[];
  logstate!: boolean;
  currentUser?: IUser;

  currentUserName?: string;
  cartId: number = 0;
  UserId!: number;
  productsCart!: number[];
  cart!: ICart
  @ViewChild(ToastComponent) toast!: ToastComponent;

  searchKeyword: string = '';


  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private filterApi: FilterAPIService,
    private userAuthService: UserAuthService,

    private storge: LocalStrogeService,
    private cartService: CartService,
    private CartCustomService: CustomCartService
  ) {
    //Get Cart ID
    this.route.params.subscribe(params => {
      this.cartId = params['id'];
    });

    //Get User ID
    this.logstate = this.userAuthService.LoggedState;
    this.userAuthService.getAllUsers().subscribe((alluser) => {
      let token = this.storge.getItemFromLocalStorge('accesToken') || this.storge.getItemFromSessionStorge('accesToken');
      this.currentUser = alluser.find((user) => user.accessToken == token);
      if (this.currentUser) {
        this.userAuthService.setLoggedState = true;
        this.UserId = this.currentUser.id; // Store the current user's id
        console.log(this.UserId);
        this.currentUserName = this.currentUser.name
        this.CartCustomService.getCartContent(this.UserId).subscribe({
          next: (val) => {
            this.cart = val
          }
        })
      } else {
        this.userAuthService.setLoggedState = false;
        this.currentUserName = ''; // Clear the current user's name if not logged in
      }
    });
    //   this.cartService.getCart(this.cartId).subscribe({
    //     next: (cart) => {
    //       let quantities = cart.products.map(product => product.quantity);
    //       console.log(cart.products);

    //       const totalQuantity = quantities.reduce((sum, quantity) => sum + quantity, 0);
    //       this.counter = totalQuantity;
    //     }
    // });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    CustomCartService.cartCounter$.subscribe({
      next: (value) => {
        this.counter = value;
      }
    })
  }

  logOut() {
    this.userAuthService.logOut();
    this.toast.openSnackBar('Logged Out', '');
  }


    const storedKeyword = localStorage.getItem('searchKeyword');
  if (storedKeyword) {
    this.searchKeyword = storedKeyword;
    this.getNames(this.searchKeyword);
  }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.names = changes['names'].currentValue
  }
    
  


  



  toggleCategoriesDropdown() {
    this.categoriesDropdown = !this.categoriesDropdown;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(this.currentUser?.name);
  }

  onSearchEnter(searchword: string) {
    this.route.navigateByUrl(`Search/${searchword}`);
    this.onSearch();
  }
  noResult :string ='';

  getNames(word: string) {
    // console.log("fdfdf")
    this.filterApi.getProductNameFromShearch(word).subscribe((data) => {
      this.names = data;
      console.log( "items in search ", this.names);
      if (this.names.length==0){
        console.log("no result found");
       this.noResult = "No results found";
      }
      
    });
    //   .subscribe((data) => {this.names = data
    //     console.log(this.names)});

    console.log(word);
  }
   
  userNavigated: boolean = false;
  itemClicked: boolean = false;

  navigateToResult(result: string) {
    this.userNavigated = true;
    this.itemClicked = true;
    // Navigate to the same page with the selected result
    this.route.navigate(['/Search', result]);
  }



  
  onSearch() {
    localStorage.setItem('searchKeyword', this.searchKeyword);
    this.getNames(this.searchKeyword);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.names = [];
      this.itemClicked = false;
    }
  }
  inputCleared: boolean = false;

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.names = [];
      this.inputCleared = true;
      this.itemClicked = false;
    }
  }

}
