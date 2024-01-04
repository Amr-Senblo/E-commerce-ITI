import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute } from '@angular/router';
import { FilterAPIService } from '../../services/filter-api.service';
import { ProductsArrayComponent } from '../products-array/products-array.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { JsonPipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
  imports: [
    MatSidenavModule,
    ProductsArrayComponent,
    MatCheckboxModule,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FilterComponent implements OnInit {
  productList!: IProduct[];
  form!: FormGroup;
  categoryId: number;
  brandsNames!: string[];
  checkboxStates: { [key: string]: boolean } = {};
  constructor(
    private activeRouter: ActivatedRoute,
    private filterApi: FilterAPIService
  ) {
    this.categoryId = +this.activeRouter.snapshot.params['categoryId'];
    console.log(this.categoryId);
  }
  ngOnInit(): void {
    this.filterApi
      .getProductsByCategoryId(this.categoryId)
      .subscribe((data) => {
        this.productList = data;
        this.brandsNames = Array.from(
          new Set(this.productList.map((p) => p.brand))
        );
        console.log(this.brandsNames);
      });
  }
  toggleCheckbox() {
    console.log(this.checkboxStates)
    let brands: string[] = Object.keys(this.checkboxStates).filter(
      (key) => this.checkboxStates[key]
    );
    console.log(brands)
    if (brands.length) {
      this.filterApi
        .getProdcutsByBrandForCategory(this.categoryId, brands)
        .subscribe((data) => {
          this.productList = data;
        });
    } else {
      this.filterApi
        .getProductsByCategoryId(this.categoryId)
        .subscribe((data) => {
          this.productList = data;
        });
    }
  }
}
