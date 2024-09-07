import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { IPages, IPerformer } from '../types';
import { environment } from '../../../environments/environment';

export const BASE_API_URL = new InjectionToken<string>('BaseApiUrl');

export abstract class HttpService<T> {
  protected http = inject(HttpClient);
  protected api = inject(BASE_API_URL);
  protected domainName = environment.domainName

  getItems$(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<IPages>(`${this.domainName}${this.api}`, { params });
  }

  getItemById$(id: number): Observable<T> {
    return this.http.get<T>(`${this.domainName}${this.api}/${id}`);
  }

  submitItem$(item: any, method: string): Observable<any> {
    return method === 'edit'
      ? this.http.put(`${this.domainName}${this.api}/${item.id}/edit`, item)
      : this.http.post(`${this.domainName}${this.api}/registration`, item);
  }

  deleteItem$(id: number): Observable<any> {
    return this.http.delete(`${this.domainName}${this.api}/${id}/delete`);
  }
}
