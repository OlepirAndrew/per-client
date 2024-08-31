import { HttpInterceptorFn } from '@angular/common/http';

export const httpStatusInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
