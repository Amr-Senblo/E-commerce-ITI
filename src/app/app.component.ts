import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { ProductComponent } from '../components/product/product.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { ProfileComponent } from '../components/profile/profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    CarouselComponent,
    ProductComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent
  ],
})
export class AppComponent {
  title = 'E-commerce-ITI';

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
}
