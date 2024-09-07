import { Injectable } from '@angular/core';
import { IAdmin } from '../../shared/types';
import { HttpService } from '../../shared/service/http.abstaract.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService extends HttpService<IAdmin>{}
