import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  newProductFormGroup: FormGroup;
  categories: any;
  constructor() {
    this.newProductFormGroup = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl(''),
    });
  }
}
