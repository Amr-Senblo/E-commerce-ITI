import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [CategoryService,UserAuthService, UserService,LocalStrogeService, CartService,CustomCartService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, RouterModule, FormsModule, ToastComponent],
})
export class HeaderComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  @Input() counter: number=0;
  isDropdownOpen = false;
  categoriesDropdown = false;
  categories: any = [];
  searchkeyword: string = '';
  names!: string[];
  logstate!: boolean;
  currentUser?: IUser;
  currentUserName?: string;
  cartId: number = 0;
  UserId!:number;
  productsCart!:number[];

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private filterApi: FilterAPIService,
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService,
    private cartService:CartService,
    private CartCustomService: CustomCartService
  )
  {
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
            this.userAuthService.setLoggedState = true ;
            this.UserId = this.currentUser.id; // Store the current user's id
            console.log(  this.UserId);
            this.currentUserName=this.currentUser.name
          } else {
            this.userAuthService.setLoggedState = false;
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
}

  logOut() {
    this.userAuthService.logOut();
    this.toast.openSnackBar('Logged Out', '');
    this.logstate = this.userAuthService.LoggedState;
    this.currentUser = undefined;
  }

  showstate() {
    console.log(this.userAuthService.LoggedState);
  }


  toggleCategoriesDropdown() {
    this.categoriesDropdown = !this.categoriesDropdown;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log(this.currentUser?.name);
  }

  onSearchEnter(searchword: string) {
    this.router.navigateByUrl(`Search/${searchword}`);
  }

  gitNames(word: string) {
    this.filterApi.getProductNameFromShearch(word).subscribe((data) => {
      this.names = data;
    });
    console.log(word);
  }
}
