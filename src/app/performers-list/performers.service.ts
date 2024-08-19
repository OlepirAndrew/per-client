import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { IPerformer } from './type';

@Injectable({
  providedIn: 'root'
})
export class PerformersService {

  constructor(private http: HttpClient) { }

  getPerformers$(): Observable<IPerformer[]> {
    return this.http.get<{performers: IPerformer[]}>('http://localhost:3000/performers')
      .pipe(
        tap(res => console.log('RES', res)),
        map(res => res.performers)
      )
  };
}
