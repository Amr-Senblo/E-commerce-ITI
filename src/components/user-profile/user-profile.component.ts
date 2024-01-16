import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  name = 'John Doe';
  isNameEditing = false;
  isSurnameEditing = false;
  isEmailEditing = false;
  isPhoneEditing = false;
  isAddressEditing = false;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  togglePassword(type: string) {
    if (type === 'old') {
      this.showOldPassword = !this.showOldPassword;
    } else if (type === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (type === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

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
}
