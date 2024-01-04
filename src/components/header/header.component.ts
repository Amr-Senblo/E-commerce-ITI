import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  providers: [CategoryService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  categoriesDropdown = false;
  categories: any = [];
  searchkeyword: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }
  toggleCategoriesDropdown() {
    this.categoriesDropdown = !this.categoriesDropdown;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
