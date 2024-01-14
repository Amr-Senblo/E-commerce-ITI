import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/iuser';
import { UserAuthService } from '../../services/user-auth.service';
import { LocalStrogeService } from '../../services/local-stroge.service';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../services/product.service';
import { ProductsArrayComponent } from "../products-array/products-array.component";

@Component({
    selector: 'app-wish-list',
    standalone: true,
    templateUrl: './wish-list.component.html',
    styleUrl: './wish-list.component.css',
    imports: [ProductsArrayComponent]
})
export class WishListComponent implements OnInit {
  logstate!: boolean;
  currentUser?: IUser;
  whistlist?: number[];
  wishedProducts: IProduct[] = [];
  constructor(
    private userAuthService: UserAuthService,
    private storge: LocalStrogeService,
    private prodAPi: ProductService
  ) {
    this.logstate = this.userAuthService.LoggedState;
    //Marium
    this.userAuthService.getAllUsers().subscribe((alluser) => {
      let token =
        this.storge.getItemFromLocalStorge('accesToken') ||
        this.storge.getItemFromSessionStorge('accesToken');
      this.currentUser = alluser.find((user) => user.accessToken == token);
      this.whistlist = this.currentUser?.wishlist;

      if (this.currentUser) {
        this.userAuthService.setLoggedState = true;
      } else this.userAuthService.setLoggedState = false;
    });
  }
  ngOnInit(): void {
    this.prodAPi.getProducts().subscribe((data) => {
      this.wishedProducts = data.filter((p) => this.whistlist?.includes(p.id));
      console.log(this.whistlist);
      console.log(this.wishedProducts);
    });
  }
}
