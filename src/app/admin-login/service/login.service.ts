import { Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

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
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  private TOKEN_KEY = makeStateKey<string>('auth-token');

  get isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return Boolean(this.tokenService.getToken());
    }

    if (isPlatformServer(this.platformId)) {
      return Boolean(this.transferState.get(this.TOKEN_KEY, null))
    }

    return false;
  }

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
          console.log(this.platformId)
          if (isPlatformBrowser(this.platformId)) {
            this.tokenService.setToken(token);
          }

          if (isPlatformServer(this.platformId)) {
            this.transferState.set(this.TOKEN_KEY, token);
          }
        })
      );
  }
}
