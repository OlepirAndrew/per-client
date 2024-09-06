import { Injectable } from '@angular/core';
import { IAdmin } from '../../shared/types';

import { HttpService } from '../../shared/service/http.abstaract.service';



@Injectable({
  providedIn: 'root'
})

export class AdminService extends HttpService<IAdmin>{
  // private http = inject(HttpClient);
  //
  // getAdmins$(page: number, limit: number ) {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('limit', limit.toString());
  //
  //   return this.http.get<IPages>('http://localhost:4400/admin/admins', { params })
  //     .pipe(tap(res => console.log('res', res,)));
  // }
  //
  // getAdminByIndex$(id: number) {
  //   return this.http.get<IAdmin>(`http://localhost:4400/admin/admins/${id}`)
  // }
  //
  // submitAdmin$(admin: INewAdminDate, method: string) {
  //   return method === 'edit'
  //     ? this.http.put(`http://localhost:4400/admin/admins/${admin.id}/edit`, admin)
  //     : this.http.post(`http://localhost:4400/admin/admins/registration`, admin)
  // }
  //
  // delete(admin: IAdmin) {
  //   return this.http.delete(`http://localhost:4400/admin/admins/${admin.id}/delete`)
  // }
}
