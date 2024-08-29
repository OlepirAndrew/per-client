import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../shared/service/token.service';

export const adminAuthGuard = (): boolean => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuth = tokenService.isAuthenticated()

  if(!tokenService.isAuthenticated() && tokenService.isBrowser()){
    router.navigate(['/admin-login']);
  }

  return isAuth;
}
