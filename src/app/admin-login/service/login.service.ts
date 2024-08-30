import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { TokenService } from '../../shared/service/token.service';
import { inject } from '@angular/core';

export interface ILogin {
  email: string;
  password: string;
}

type IToken = Pick<{token: string}, "token">

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login$(login: ILogin) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<IToken>('http://localhost:4400/admin-login', login)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
        tap(({token}: IToken) => {
            this.tokenService.setToken(token);
        })
      );
  }
}
