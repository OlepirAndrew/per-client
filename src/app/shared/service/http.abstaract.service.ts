import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPages } from '../types';

export const BASE_API_URL = new InjectionToken<string>('BaseApiUrl');

// @Injectable({
//   providedIn: 'root'
// })
export abstract class HttpService<T> {
  protected http = inject(HttpClient);
  protected baseUrl = inject(BASE_API_URL);

  getItems$(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<IPages>(this.baseUrl, { params })
      .pipe(tap(res => console.log('res', res)));
  }

  getItemById$(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  submitItem$(item: any, method: string): Observable<any> {
    return method === 'edit'
      ? this.http.put(`${this.baseUrl}/${item.id}/edit`, item)
      : this.http.post(`${this.baseUrl}/registration`, item);
  }

  deleteItem$(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/delete`);
  }
}
