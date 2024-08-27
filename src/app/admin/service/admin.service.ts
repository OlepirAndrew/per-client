import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdmin } from './admin';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getAdmins$() {
    return this.http.get('http://localhost:4400/admin/admins')
      .pipe(tap(res => {
        console.log('RES', res);
      }))
  }
}
