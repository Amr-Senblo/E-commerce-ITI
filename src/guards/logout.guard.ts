import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const logoutGuard: CanActivateFn = (route, state) => {
  if(!inject(UserAuthService).LoggedState) return true
  else
  
  inject(Router).navigate(['Home'])
  return false
};
