import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-products-array',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginationComponent],
  templateUrl: './products-array.component.html',
  styleUrl: './products-array.component.css'
})
export class ProductsArrayComponent {

  @Input() products: IProduct[] = []
  currentPage = 1;
  itemsPerPage = 8;

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  getPaginatedProducts(): IProduct[] {
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);//0-8 //8-16 //16-..
  }

}























