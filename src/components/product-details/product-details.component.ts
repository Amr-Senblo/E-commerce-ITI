import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule , RouterLink , ProductComponent],
  providers: [ProductService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  ID = 0;
  p: any;
  products: IProduct[] = []
  constructor(private myService: ProductService, myActivated: ActivatedRoute) {
    this.ID = myActivated.snapshot.params["id"];
    console.log("ID : " + this.ID);
  }
  ngOnInit(): void {
    this.myService.getProduct(this.ID).subscribe({
      next: (data) => {
        console.log(data)
        this.p = data;
      },
      error: () => { console.log("error occured") }
    })

    this.myService.getProducts().subscribe({
      next:(data)=>{
        console.log(data)
        this.products = data.slice(0, 8)
      },
      error:()=>{console.log("Error")}
    })
  }
  
}

