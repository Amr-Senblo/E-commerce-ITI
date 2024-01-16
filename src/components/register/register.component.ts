import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IUser } from '../../models/iuser';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../services/register.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('userForm', { static: false })
  userForm!: NgForm;

  matched: boolean = false;
  submitted = false;
  userIdCounter = Math.floor(Math.random() * 1000000000);
  userModel: IUser = {
    id: this.userIdCounter,
    accessToken: this.userIdCounter.toString(),

    name: '',
    email: '',
    phone: '',
    profilePic:
      'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
    Address: '',
    gender: '',
    password: '',
    confirmPassword: '',
    wishlist: [],
  };
  constructor(
    private _registerService: RegisterService // private _ngForm: NgForm
  ) {}

  passowrdMatch() {
    this.matched = this.userModel.password === this.userModel.confirmPassword;
  }
  onSubmit() {
    this.submitted = true;

    this._registerService.register(this.userModel).subscribe(
      (data) => {
        console.log('Success!', data);
        this.userForm.resetForm();
      },
      (error) => console.error('Error!', error)
    );
  }
}
