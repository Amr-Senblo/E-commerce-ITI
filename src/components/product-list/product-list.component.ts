import { Component, Input, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent,HttpClientModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(private service:ProductService,private route: ActivatedRoute){}
  products:IProduct[]=[]
  private category_id=1;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    this.category_id = +params['categoryId']; // '+' is used to convert the parameter to a number
    console.log(this.category_id);
    this.service.getProductsOfCategory(this.category_id).subscribe(
      {
        next:(data:IProduct[])=>{
          this.products=data,
          console.log(this.category_id);
        },
        error:()=>"error"
      }
    );
    });
  }

}
