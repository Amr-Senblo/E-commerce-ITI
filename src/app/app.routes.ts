import { Routes } from '@angular/router';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { ErrorPageComponent } from '../components/error-page/error-page.component';
import { CartComponent } from '../components/cart/cart.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { HomeComponent } from '../components/home/home.component';

import { RegisterComponent } from '../components/register/register.component';

import { FilterComponent } from '../components/filter/filter.component';

import { CreateProductComponent } from '../components/create-product/create-product.component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'category/:categoryId', component: ProductListComponent },
      { path: 'Category/:categoryId/:id', component: ProductDetailsComponent },
      { path: 'Cart/:id', component: CartComponent }, //Add Guard
      { path: 'Search/:word', component: FilterComponent },
      
    ],
  },
  { path: 'CreateProduct', component: CreateProductComponent },
  {
    path: 'register',
    component: RegisterComponent,
    data: { isRegister: true },
  },

  { path: 'Profile/:id', component: ProfileComponent }, //Add Guard
  { path: '**', component: ErrorPageComponent },
];
