import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { adminAuthGuard } from './admin-login/service/admin-auth-guard-fn';

export const routes: Routes = [
  { path: '', component: MainComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminAuthGuard],
    children: [

    ]
  },
  { path: 'login-admin', component: AdminLoginComponent }, // Добавьте маршрут для LoginAdmin
  { path: '**', redirectTo: '' }
];
