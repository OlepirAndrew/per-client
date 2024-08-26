import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'login-admin', component: AdminLoginComponent }, // Добавьте маршрут для LoginAdmin
  { path: '**', redirectTo: '' }
];
