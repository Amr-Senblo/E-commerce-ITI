import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterAPIService } from '../../services/filter-api.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,  RouterModule, FormsModule],
  providers: [CategoryService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  categoriesDropdown = false;
  categories: any = [];
  searchkeyword: string = '';
  names!: string[];

  constructor(
    private categoryService: CategoryService,
    private route: Router,
    private filterApi: FilterAPIService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      // console.log(this.categories);
    });
  }
  toggleCategoriesDropdown() {
    this.categoriesDropdown = !this.categoriesDropdown;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onSearchEnter(searchword: string) {
    this.route.navigateByUrl(`Search/${searchword}`);
  }
  gitNames(word: string) {
    // console.log("fdfdf")
     this.filterApi .getProductNameFromShearch(word).subscribe(data=>{this.names=data})
    //   .subscribe((data) => {this.names = data
    //     console.log(this.names)});

    console.log(word);
  }
}
