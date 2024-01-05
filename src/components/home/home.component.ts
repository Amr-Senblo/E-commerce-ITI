<<<<<<<<< Temporary merge branch 1
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductComponent } from '../product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/iproduct';
=========
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CategoriesComponent } from '../categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { IProduct } from '../../models/iproduct';
import { ProductsArrayComponent } from '../products-array/products-array.component';
import { Image } from '../../models/image';
import { ICategory } from '../../models/icategory';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

  imports: [
    CarouselComponent,
    CategoriesComponent,
    HttpClientModule,
    ProductsArrayComponent,
    SliderComponent,
  ],
  providers: [ProductService, CategoryService],
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


=========
  imports: [CarouselComponent, CategoriesComponent, HttpClientModule, ProductsArrayComponent, SliderComponent],
  providers: [ProductService, CategoryService]
})
export class HomeComponent implements OnInit {
  images: Image[] = [{ imgSrc: 'https://m.media-amazon.com/images/I/714qCf4ZqGL.SX3000.jpg', imgAlt: 'cover' }]
  allCategories: ICategory[] = [];
  mobileCatg4: IProduct[] = [];
  smartWatch4: IProduct[] = [];
  laptops4: IProduct[] = [];
  constructor(public productService: ProductService, public categoryServise: CategoryService) { }

  ngOnInit(): void {
    this.productService.getProduct4(1).subscribe({
      next: (value) => {
        this.mobileCatg4 = value;
      },
      error: (err) => console.log(err)
    })
    this.productService.getProduct4(2).subscribe({
      next: (value) => {
        this.smartWatch4 = value;
      },
      error: (err) => console.log(err)
    })
    this.productService.getProduct4(3).subscribe({
      next: (value) => {
        this.laptops4 = value;
      },
      error: (err) => console.log(err)
    })
    this.categoryServise.getCategories().subscribe({
      next: (value) => {
        this.allCategories = value
        for (let category of this.allCategories)
          this.images.push({ imgSrc: category.imageCover, imgAlt: category.name })
      },
      error: (err) => console.log(err)
    })
  }
>>>>>>>>> Temporary merge branch 2
}
