import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { ICart } from '../../models/icart';
import { IproductBuyed } from '../../models/iproduct-buyed';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css',
})
export class ProductCartComponent {
  @Output() cartProductEvent = new EventEmitter<IproductBuyed>();
  @Input() product: IProduct = {} as IProduct;

  @Input() quantity: number = 0;
  displayItem = 'block';
  onMinus(id: number, quantity: number) {
    if (this.quantity > 1) {
      this.quantity = quantity - 1;
      this.cartProductEvent.emit({ id: id, quantity: quantity - 1 });
    }
  }
  onPlus(id: number, quantity: number) {
    if (this.quantity <= this.product.quantity) this.quantity = quantity + 1;
    this.cartProductEvent.emit({ id: id, quantity: quantity + 1 });
  }
  onRemove(id: number) {
    this.cartProductEvent.emit({ id: id, quantity: 0 });
    this.displayItem = 'none';
  }
}
