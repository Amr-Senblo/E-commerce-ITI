import { Routes } from '@angular/router';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { CartComponent } from '../components/cart/cart.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { HomeComponent } from '../components/home/home.component';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { FilterComponent } from '../components/filter/filter.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Category/:categoryId', component: ProductListComponent },
      { path: 'Search/:word', component: FilterComponent },
      { path: 'Category/:categoryId/:id', component: ProductDetailsComponent },
      { path: 'Cart/:id', component: CartComponent }, //Add Guard
    ],
  },
  { path: 'CreateProduct', component: CreateProductComponent },
  { path: 'Profile/:id', component: ProfileComponent }, //Add Guard
  { path: '**', component: ErrorPageComponent },
];
