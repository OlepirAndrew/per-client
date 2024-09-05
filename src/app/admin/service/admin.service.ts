import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAdmin, IAdminPages } from './admin';
import { INewAdminDate } from '../admin-page/admin-page.component';
import { switchMap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getAdmins$(page: number, limit: number ) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<IAdminPages>('http://localhost:4400/admin/admins', { params });
  }

  getAdminByIndex$(id: number) {
    return this.http.get<IAdmin>(`http://localhost:4400/admin/admins/${id}`)
  }

  submitAdmin$(admin: INewAdminDate, method: string) {
    return method === 'edit'
      ? this.http.put(`http://localhost:4400/admin/admins/${admin.id}/edit`, admin)
      : this.http.post(`http://localhost:4400/admin/admins/registration`, admin)
  }

  delete(admin: IAdmin) {
    return this.http.delete(`http://localhost:4400/admin/admins/${admin.id}/delete`)
  }
}
