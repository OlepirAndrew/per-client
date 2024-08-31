import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdmin } from './admin';
import { INewAdminDate } from '../admin-page/admin-page.component';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getAdmins$() {
    return this.http.get<IAdmin[]>('http://localhost:4400/admin/admins')
  }

  getAdminByIndex$(id: number) {
    return this.http.get<IAdmin>(`http://localhost:4400/admin/admins/${id}`)
  }

  submitAdmin$(admin: INewAdminDate, method: string) {
    return method === 'edit'
      ?  this.http.put(`http://localhost:4400/admin/admins/${admin.id}/edit`, admin)
      : this.http.post(`http://localhost:4400/admin/admins/registration`, admin)
  }

  delete(admin: IAdmin) {
    return this.http.delete(`http://localhost:4400/admin/admins/${admin.id}/delete`)
      .pipe(switchMap(() => this.getAdmins$()));
  }
}
