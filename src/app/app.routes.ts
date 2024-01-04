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

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'category/:categoryId', component: ProductListComponent },
      { path: 'search/:keyword', component: FilterComponent },
      { path: 'category/:categoryId/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent }, //Add Guard
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { isRegister: true },
  },
  { path: 'Profile/:id', component: ProfileComponent }, //Add Guard
  { path: '**', component: ErrorPageComponent },
];
