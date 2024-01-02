import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductComponent } from '../product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CarouselComponent, CategoriesComponent, ProductComponent, HttpClientModule],
  providers: [ProductService],

})
export class HomeComponent implements OnInit {
  images = [
    {
      imgSrc:
        'https://images.unsplash.com/photo-1703774626005-9eb89bd30df4?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'photo',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1682686579688-c2ba945eda0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'photo',
    },
    {
      imgSrc:
        'https://plus.unsplash.com/premium_photo-1664382465607-420346d391bd?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imgAlt: 'photo',
    },
  ];

  constructor(private myService: ProductService) { }

  AllProducts: IProduct[] = [];
  ngOnInit(): void {

    this.myService.getProducts().subscribe((data: IProduct[]) => {
      this.AllProducts = data.slice(0, 8);
      console.log(this.AllProducts);
      
    });



  }


}
