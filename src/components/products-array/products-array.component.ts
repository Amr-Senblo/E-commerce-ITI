import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-array',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products-array.component.html',
  styleUrl: './products-array.component.css'
})
export class ProductsArrayComponent {
  @Input() products: IProduct[] = []
}
