import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  let login = inject(LoginService);
  if(login.isLoggedIn() && login.getUserRole()=='NORMAL'){
    return true;
  }
  let router = inject(Router);
  router.navigateByUrl('login');
  return false;
};
