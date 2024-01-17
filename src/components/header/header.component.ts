import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
export class HeaderComponent implements OnInit, OnChanges {
onItemBlur() {
this.itemClicked=false
console.log(this.itemClicked)
}
onItemFoucs() {
this.itemClicked=true

  console.log(this.itemClicked)
}

  counter: number = 0;
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
  @Input() names!: string[];
  logstate!: boolean;
  currentUser?: IUser;
  currentUserName?: string;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  searchKeyword: string = '';

  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private filterApi: FilterAPIService,
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService
  ) {
    this.logstate = this.userAuthService.LoggedState;
    this.userAuthService.getAllUsers().subscribe((alluser) => {
      let token =
        this.storge.getItemFromLocalStorge('accesToken') ||
        this.storge.getItemFromSessionStorge('accesToken');
      this.currentUser = alluser.find((user) => user.accessToken == token);
      if (this.currentUser) {
        this.userAuthService.setLoggedState = true;
        this.currentUserName = this.currentUser.name; // Store the current user's name
        console.log(this.currentUserName);
      } else {
        this.userAuthService.setLoggedState = false;
        this.currentUserName = ''; // Clear the current user's name if not logged in
      }
    });

    const storedKeyword = localStorage.getItem('searchKeyword');
    if (storedKeyword) {
      this.searchKeyword = storedKeyword;
      this.getNames(this.searchKeyword);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.names = changes['names'].currentValue;
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
    this.onSearch();
  }
  noResult: string = '';

  getNames(word: string) {
    // console.log("fdfdf")
    this.filterApi.getProductNameFromShearch(word).subscribe((data) => {
      this.names = data;
      console.log('items in search ', this.names);
      if (this.names.length == 0) {
        console.log('no result found');
        this.noResult = 'No results found';
      }
    });
    //   .subscribe((data) => {this.names = data
    //     console.log(this.names)});

    console.log(word);
  }

  userNavigated: boolean = false;
  itemClicked: boolean = true;

  navigateToResult(result: string) {
   
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
