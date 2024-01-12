import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userModel: IUser = {
    //auto generate id automatically
    id: Math.floor(Math.random() * 1000000000000),
    name: '',
    email: '',
    phone: '',
    profilePic: '',
    Address: '',
    gender: '',
    passward: '',
    confirmPassward: '',
    wishlist: [],
  };
  constructor() {}

  passowrdMatch() {
    console.log(this.userModel.passward, this.userModel.confirmPassward);
    return this.userModel.passward === this.userModel.confirmPassward;
  }
  register() {
    console.log(this.userModel);
  }
}
