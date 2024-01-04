import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: IProduct = <IProduct>{};
  // {
  //   "id": 1,
  //   "name": "iPhone X",
  //   "description": "High-performance smartphone with advanced features.",
  //   "price": 799.99,
  //   "quantity": 100,
  //   "imageCover": "https://example.com/iphone_x.jpg",
  //   "images": [
  //     "https://example.com/iphone_x_image1.jpg",
  //     "https://example.com/iphone_x_image2.jpg",
  //     "https://example.com/iphone_x_image3.jpg"
  //   ],
  //   "category": 1,
  //   "ratingAverage": 4.8,
  //   "ratingQuantity": 25,
  //   "createdAt": "2022-01-15T12:30:00.000Z",
  //   "updatedAt": "2022-01-15T12:30:00.000Z",
  //   "CommonSpecifications": {
  //     "Processor": "Apple A11 Bionic",
  //     "RAM": "3GB",
  //     "Storage": "64GB",
  //     "screenSize": "5.8 inches",
  //     "BatteryCapacity": "2716 mAh",
  //     "OperatingSystem": "iOS 11",
  //     "BiometricAuthentication": "Face ID",
  //     "WirelessCharging": "Yes",
  //     "Ports": "Lightning"
  //   }
  // }
}
