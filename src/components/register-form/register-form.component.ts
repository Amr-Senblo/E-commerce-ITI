import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  userRegForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userRegForm = fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      // gender: [''],
      email: [''],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{12}')],
      ],
      password: [''],
      profilePic: [''],
      address: fb.group({
        street: [''],
        city: [''],
        country: [''],
      }),
    });
  }
  get formName() {
    return this.userRegForm.get('name');
  }
  get formMobileNumber() {
    return this.userRegForm.get('mobileNumber');
  }
  get formEmail() {
    return this.userRegForm.get('email');
  }
  get formPassword() {
    return this.userRegForm.get('password');
  }
  get formStreet() {
    return (this.userRegForm.get('address') as FormGroup).get('street');
  }
  get formCity() {
    return (this.userRegForm.get('address') as FormGroup).get('city');
  }
  get formCountry() {
    return (this.userRegForm.get('address') as FormGroup).get('country');
  }
  submit(){
    // let newUser:IUser=
  }
  // constructor() {
  //   this.userRegForm = new FormGroup({
  //     name: new FormControl('', [
  //       Validators.required,
  //       Validators.pattern('[A-Za-z]{3,}'),
  //     ]),
  //     gender: new FormControl(''),
  //     email: new FormControl(''),
  //     mobileNumber: new FormControl(''),
  //     password: new FormControl(''),
  //     profilePic: new FormControl(''),
  //     address: new FormGroup({
  //       street: new FormControl(''),
  //       city: new FormControl(''),
  //       country: new FormControl(''),
  //     }),
  //   });
  // }
}
