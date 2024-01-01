import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  {

  @Input() product:any;

  constructor() {
    this.product = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 10.99,
        quantity: 5,
        imageCover: 'product1.jpg',
        images: ['image1.jpg', 'image2.jpg'],
        category: 1,
        ratingAverage: 4.5,
        ratingQuantity: 10,
        createdAt: '2022-01-01',
        updatedAt: '2022-01-02',
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 19.99,
        quantity: 8,
        imageCover: 'product2.jpg',
        images: ['image3.jpg', 'image4.jpg'],
        category: 2,
        ratingAverage: 3.8,
        ratingQuantity: 5,
        createdAt: '2022-02-01',
        updatedAt: '2022-02-02',
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 99.99,
        quantity: 8,
        imageCover: 'product3.jpg',
        images: ['image5.jpg', 'image6.jpg'],
        category: 2,
        ratingAverage: 3.8,
        ratingQuantity: 5,
        createdAt: '2022-02-01',
        updatedAt: '2022-02-02',
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description for Product 3',
        price: 55.55,
        quantity: 8,
        imageCover: 'product4.jpg',
        images: ['image7.jpg', 'image8.jpg'],
        category: 2,
        ratingAverage: 3.8,
        ratingQuantity: 5,
        createdAt: '2022-02-01',
        updatedAt: '2022-02-02',
      },
    ];
  }
}