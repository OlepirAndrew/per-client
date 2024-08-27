import { LoginService } from '../admin-login/service/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../shared/service/token.service';

export const adminAuthGuard = (): boolean => {
  const loginService = inject(LoginService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuth = Boolean(tokenService.getToken())

  if(!isAuth && tokenService.isBrowser()){
    router.navigate(['/admin-login']);
  }

  return isAuth;
}
