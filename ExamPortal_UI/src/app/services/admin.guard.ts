import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let login = inject(LoginService);
  if(login.isLoggedIn() && login.getUserRole()=='ADMIN'){
    return true;
  }
  let router = inject(Router);
  router.navigateByUrl('login');
  return false;
};
