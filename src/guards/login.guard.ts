import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
if(inject(UserAuthService).LoggedState) return true
else
alert('Please log in First')
inject(Router).navigate(['Login'])
return false
 
};
