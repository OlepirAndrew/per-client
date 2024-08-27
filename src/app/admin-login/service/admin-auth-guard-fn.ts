import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminAuthGuard = (): boolean => {
  const loginService = inject(LoginService);
  const router = inject(Router);

    if (loginService.isAuthenticated) {
      return true
    }

    router.navigate(['login-admin']);
    return false

}
