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

  submitted = false;
  userModel: IUser = {
    //auto generate id automatically
    id: Math.floor(Math.random() * 1000000000000),
    password: '',
    name: '',
    email: '',
    phone: '',
    profilePic: '',
    Address: '',
    gender: '',
    passward: '',
    confirmPassward: '',
    wishlist: [],
    accessToken:''
  };
  constructor(
    private _registerService: RegisterService // private _ngForm: NgForm
  ) {}

  passowrdMatch() {
    return this.userModel.passward === this.userModel.confirmPassward;
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
