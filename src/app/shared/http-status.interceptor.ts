import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import { catchError, filter, map, Observable, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { SnackBarService } from './service/snack-bar.service';

export function httpStatusInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackBarService = inject(SnackBarService);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      snackBarService.openSnackBar(
        `${error.error.statusCode || error.error.status} ${error.error.message}`,
        'error'
      )

      return throwError(() => error);
    }),
    filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
    map((event: HttpResponse<unknown>) => {
      if (event.body && typeof event.body === 'object' && 'status' in event.body && 'message' in event.body) {
        snackBarService.openSnackBar(
          `${event.body.status} ${event.body.message}`,
          'success'
        );
      }

      return event;
    }),
  );
}
