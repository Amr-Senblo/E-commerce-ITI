import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  providers: [UserProfileService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  constructor(private userService: UserProfileService) {}
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('surnameInput') surnameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('phoneInput') phoneInput!: ElementRef;
  @ViewChild('addressInput') addressInput!: ElementRef;
  @ViewChild('oldPasswordInput') oldPasswordInput!: ElementRef;
  @ViewChild('newPasswordInput') newPasswordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;

  loggedUser = {
    id: 127351569297,
    name: 'Omdaaaaaaa',
    surname: 'Omda',
    email: 'amrsenblo@gmail.com',
    phone: '01012345678',
    profilePic:
      'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
    Address: 'Egypt, ElGarbiah, Tanta',
    gender: 'male',
    passward: 'A1234567',
    confirmPassward: 'A1234567',
    wishlist: [],
  };

  passwordChanged = false;
  wrongPassword = false;

  isNameEditing = false;
  isSurnameEditing = false;
  isEmailEditing = false;
  isPhoneEditing = false;
  isAddressEditing = false;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  toggleEdit(field: string) {
    if (field === 'name') {
      this.isNameEditing = true;
    } else if (field === 'surname') {
      this.isSurnameEditing = true;
    } else if (field === 'email') {
      this.isEmailEditing = true;
    } else if (field === 'phone') {
      this.isPhoneEditing = true;
    } else if (field === 'address') {
      this.isAddressEditing = true;
    }
  }

  togglePassword(type: string) {
    if (type === 'old') {
      this.showOldPassword = !this.showOldPassword;
    } else if (type === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (type === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  udateUserInfo() {
    const updatedUser: any = {};
    if (this.isNameEditing) {
      updatedUser.name = this.nameInput.nativeElement.value;
      this.isNameEditing = false;
    }
    if (this.isSurnameEditing) {
      updatedUser.surname = this.surnameInput.nativeElement.value;
      this.isSurnameEditing = false;
    }
    if (this.isEmailEditing) {
      updatedUser.email = this.emailInput.nativeElement.value;
      this.isEmailEditing = false;
    }
    if (this.isPhoneEditing) {
      updatedUser.phone = this.phoneInput.nativeElement.value;
      this.isPhoneEditing = false;
    }
    if (this.isAddressEditing) {
      updatedUser.address = this.addressInput.nativeElement.value;
      this.isAddressEditing = false;
    }

    this.userService.updateUser(this.loggedUser.id, updatedUser).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changePassword() {
    const oldPassword = this.oldPasswordInput.nativeElement.value;
    const newPassword = this.newPasswordInput.nativeElement.value;
    const confirmPassword = this.confirmPasswordInput.nativeElement.value;

    if (oldPassword !== this.loggedUser.passward) {
      console.log('Wrong Password');
    } else if (
      newPassword === confirmPassword &&
      oldPassword === this.loggedUser.passward
    ) {
      this.userService
        .changePassword(this.loggedUser.id, {
          password: newPassword,
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.passwordChanged = true;
          },
          (err) => {
            console.log(err);
            this.wrongPassword = true;
          }
        );
    } else {
      console.log('Passwords do not match');
    }
  }
}
