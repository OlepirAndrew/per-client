import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdmin } from './admin';
import { Observable } from 'rxjs';
import { INewAdminDate } from '../admin-page/admin-page.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  getAdmins$() {
    return this.http.get<IAdmin[]>('http://localhost:4400/admin/admins')
  }

  getAdminByIndex$(id: number): Observable<IAdmin | undefined> {
    return this.http.get<IAdmin>(`http://localhost:4400/admin/admins/${id}`)
  }

  editAdmin$(admin: INewAdminDate) {
    console.log('editAdmin$', admin)
    return this.http.put(`http://localhost:4400/admin/admins/${admin.id}/edit`, admin)
  }

  addAdmin$(admin: INewAdminDate) {
    console.log('addAdmin$', admin)
    return this.http.post(`http://localhost:4400/admin/admins/registration`, admin)
  }
}
