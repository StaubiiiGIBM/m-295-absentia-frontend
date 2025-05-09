import { Routes } from '@angular/router';
import {DashboardComponent} from './components/views/pages/dashboard/dashboard.component';
import {LoginComponent} from './components/views/core/login/login.component';
import {appCanActivate} from './guard/app.auth.guard';
import {AppRoles} from '../app.roles';
import {NoAccessComponent} from './components/views/pages/no-access/no-access.component';
import {DepartmentListComponent} from './components/views/pages/department-list/department-list.component';

export const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'department',
    component: DepartmentListComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Department Listenansicht'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Das Dashboard'}
  },
  {
    path: 'noaccess',
    component: NoAccessComponent
  }
];
