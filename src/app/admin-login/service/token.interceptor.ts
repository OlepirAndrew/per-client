import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).getToken() || 'abracadabra';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('authReq', authReq)
  return next(authReq);
};
