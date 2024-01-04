import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { ICart } from '../../models/icart';
import { IproductBuyed } from '../../models/iproduct-buyed';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  @Output() cartProductEvent = new EventEmitter<IproductBuyed>();
  @Input() product: IProduct = {
    "id": 1,
    "name": "iPhone X",
    "description": "High-performance smartphone with advanced features.",
    "price": 799.99,
    "quantity": 100,
    "imageCover": "https://m.media-amazon.com/images/I/71i2XhHU3pL._AC_SX569_.jpg",
    "images": [
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51S-6V4UOLL._AC_SL1100_.jpg",
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/515Ro7dQ02L._AC_SL1100_.jpg",
      "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/51YZcGtBeYL._AC_SL1100_.jpg"
    ],
    "category": 1,
    "ratingAverage": 4.8,
    "ratingQuantity": 25,
    "createdAt": "2022-01-15T12:30:00.000Z",
    "updatedAt": "2022-01-15T12:30:00.000Z",
    "CommonSpecifications": {
      "Processor": "Apple A11 Bionic",
      "RAM": "3GB",
      "Storage": "64GB",
      "screenSize": "5.8 inches",
      "BatteryCapacity": "2716 mAh",
      "OperatingSystem": "iOS 11",
      "BiometricAuthentication": "Face ID",
      "WirelessCharging": "Yes",
      "Ports": "Lightning"
    }
  }
  @Input() quantity: number = 0;
  displayItem = 'block';
  onMinus(id: number, quantity: number) {
    if (this.quantity > 1) {
      this.quantity = quantity - 1;
      this.cartProductEvent.emit({ id: id, quantity: quantity - 1 });
    }
  }
  onPlus(id: number, quantity: number) {
    if (this.quantity <= this.product.quantity)
      this.quantity = quantity + 1;
    this.cartProductEvent.emit({ id: id, quantity: quantity + 1 });
  }
  onRemove(id: number) {
    this.cartProductEvent.emit({ id: id, quantity: 0 })
    this.displayItem = 'none'
  }
}
