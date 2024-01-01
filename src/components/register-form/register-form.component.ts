import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  userRegForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userRegForm = fb.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      gender: [''],
      email: [''],
      mobileNumber: [''],
      password: [''],
      profilePic: [''],
      address: fb.group({
        street: [''],
        city: [''],
        country: [''],
      }),
    });
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
