import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { adminAuthGuard } from './admin/admin-auth-guard-fn';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'admins', component: AdminListComponent },
      { path: 'admins/add', component: AdminPageComponent },
      { path: 'admins/edit/:id', component: AdminPageComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
