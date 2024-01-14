import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginForm: FormGroup;
  passwordInputType: string;
  constructor(private fb: FormBuilder,private userAuth:UserAuthService) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      remmberMe: [true],
      password: ['', Validators.required],
      showPassword: [false],
    });

    this.passwordInputType = 'password';
  }
  get formEmail() {
    return this.loginForm.controls['email'];
  }
  get formpassword() {
    return this.loginForm.controls['password'];
  }
  get formRemmberMe() {
    return this.loginForm.controls['remmberMe'];
  }
  get formShowPassword() {
    return this.loginForm.get('showPassword');
  }

  login() {
  this.userAuth.logIn(this.formEmail.value,this.formpassword.value,)
  }
}
