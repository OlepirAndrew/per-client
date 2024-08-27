import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { adminAuthGuard } from './admin/admin-auth-guard-fn';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';

export const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'admin-login', component: AdminLoginComponent }, // Добавьте маршрут для LoginAdmin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'admins', component: AdminListComponent },
      { path: 'admins/add', component: AddAdminComponent },
      { path: 'admins/edit/:id', component: EditAdminComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
