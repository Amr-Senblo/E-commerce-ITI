import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterAPIService } from '../../services/filter-api.service';
import { UserAuthService } from '../../services/user-auth.service';
import { IUser } from '../../models/iuser';
import { LocalStrogeService } from '../../services/local-stroge.service';
import { ToastComponent } from '../toast/toast.component';
@Component({
  selector: 'app-header',
  standalone: true,
  providers: [CategoryService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, RouterModule, FormsModule, ToastComponent],
})
export class HeaderComponent implements OnInit {
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

  isDropdownOpen = false;
  categoriesDropdown = false;
  categories: any = [];
  searchkeyword: string = '';
  names!: string[];
  logstate!: boolean;
  currentUser?: IUser;
  currentUserName?:string;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private filterApi: FilterAPIService,
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService
  ) {
    // this.logstate = this.userAuthService.LoggedState;
    // this.userAuthService.getAllUsers().subscribe((alluser) => {
    //   let token =this.storge.getItemFromLocalStorge('accesToken')||this.storge.getItemFromSessionStorge('accesToken')
    //   this.currentUser = alluser.find(
    //     (user) => user.accessToken == token
    //   );
    //   if (this.currentUser) {
    //     this.userAuthService.setLoggedState = true;
    //   } else this.userAuthService.setLoggedState = false;

    this.logstate = this.userAuthService.LoggedState;
this.userAuthService.getAllUsers().subscribe((alluser) => {
  let token = this.storge.getItemFromLocalStorge('accesToken') || this.storge.getItemFromSessionStorge('accesToken');
  this.currentUser = alluser.find((user) => user.accessToken == token);
  if (this.currentUser) {
    this.userAuthService.setLoggedState = true ;
    this.currentUserName = this.currentUser.name; // Store the current user's name
    console.log(  this.currentUserName);
    
  } else {
    this.userAuthService.setLoggedState = false;
    this.currentUserName = ''; // Clear the current user's name if not logged in
  }
    });
  }
    
  


  


  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
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
  }

  gitNames(word: string) {
    // console.log("fdfdf")
    this.filterApi.getProductNameFromShearch(word).subscribe((data) => {
      this.names = data;
    });
    //   .subscribe((data) => {this.names = data
    //     console.log(this.names)});

    console.log(word);
  }
}
