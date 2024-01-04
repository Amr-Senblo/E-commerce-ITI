import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDropdownOpen = false;
  categoriesDropdown = false;
  categories = [
    {
      name: 'Category 1',
    },
    {
      name: 'Category 2',
    },
    {
      name: 'Category 3',
    },
    {
      name: 'Category 4',
    },
    {
      name: 'Category 5',
    },
  ];

  toggleCategoriesDropdown() {
    this.categoriesDropdown = !this.categoriesDropdown;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
