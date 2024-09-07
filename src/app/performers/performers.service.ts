import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpService } from '../shared/service/http.abstaract.service';
import { IPerformer } from '../shared/types';

export const PER_API_URL = new InjectionToken<string>('BaseApiUrl');

@Injectable({
  providedIn: 'root'
})
export class PerformersService extends HttpService <IPerformer> {
  protected override api = inject(PER_API_URL);
}
