import { inject, Injectable, InjectionToken } from '@angular/core';
import { BASE_API_URL, HttpService } from '../shared/service/http.abstaract.service';
import { IAdmin, IPerformer } from '../shared/types';

export const PER_API_URL = new InjectionToken<string>('BaseApiUrl');

@Injectable({
  providedIn: 'root'
})
export class PerformersService extends HttpService <IPerformer> {
  protected override baseUrl = inject(PER_API_URL);

  constructor() {
    super();

    console.log('PerformersService', this.baseUrl)
  }

}
