import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: IProduct = <IProduct>{};
  heart = 'fa-regular fa-heart '
  constructor(private router: Router) { }
  onWishList() {
    if (this.heart === 'fa-regular fa-heart ')
      this.heart = 'fa-solid fa-heart wish'
    else
      this.heart = 'fa-regular fa-heart '
  }
  refreshRoute() {
    const currentUrl = '/Category/' + this.product.category + '/' + this.product.id;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
