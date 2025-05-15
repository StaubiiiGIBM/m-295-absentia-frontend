import { Routes } from '@angular/router';
import {DashboardComponent} from './components/views/pages/dashboard/dashboard.component';
import {LoginComponent} from './components/views/core/login/login.component';
import {appCanActivate} from './guard/app.auth.guard';
import {AppRoles} from '../app.roles';
import {NoAccessComponent} from './components/views/pages/no-access/no-access.component';
import {DepartmentListComponent} from './components/views/pages/department-list/department-list.component';
import {DepartmentFormComponent} from './components/views/pages/department-form/department-form.component';
import {AbsenceReasonListComponent} from './components/views/pages/absence-reason-list/absence-reason-list.component';
import {AbsenceReasonFormComponent} from './components/views/pages/absence-reason-form/absence-reason-form.component';
import {EmployeeListComponent} from './components/views/pages/employee-list/employee-list.component';
import {EmployeeFormComponent} from './components/views/pages/employee-form/employee-form.component';
import {AbsenceListComponent} from './components/views/pages/absence-list/absence-list.component';
import {AbsenceFormComponent} from './components/views/pages/absence-form/absence-form.component';

export const routes: Routes = [
  {
    path: '', component: LoginComponent
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
    path: 'department',
    component: DepartmentListComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Abteilung Listenansicht'}
  },
  {
    path: 'department/add',
    pathMatch: 'full',
    component: DepartmentFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Abteilung Hinzufügen'}
  },
  {
    path: 'department/edit/:id',
    pathMatch: 'full',
    component: DepartmentFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Abteilung Bearbeiten'}
  },
  {
    path: 'absenceReason',
    component: AbsenceReasonListComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Absenzgründe Listenansicht'}
  },
  {
    path: 'absenceReason/add',
    pathMatch: 'full',
    component: AbsenceReasonFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Absenzgrund Hinzufügen'}
  },
  {
    path: 'absenceReason/edit/:id',
    pathMatch: 'full',
    component: AbsenceReasonFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Absenzgrund Bearbeiten'}
  },
  {
    path: 'employee',
    component: EmployeeListComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Mitarbeiter Listenansicht'}
  },
  {
    path: 'employee/add',
    pathMatch: 'full',
    component: EmployeeFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Mitarbeiter Hinzufügen'}
  },
  {
    path: 'employee/edit/:id',
    pathMatch: 'full',
    component: EmployeeFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Mitarbeiter Bearbeiten'}
  },
  {
    path: 'absence',
    component: AbsenceListComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Absenzen Listenansicht'}
  },
  {
    path: 'absence/add',
    pathMatch: 'full',
    component: AbsenceFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.User],
      pagetitle: 'Absenz Hinzufügen'}
  },
  {
    path: 'absence/edit/:id',
    pathMatch: 'full',
    component: AbsenceFormComponent,
    canActivate: [appCanActivate],
    data: {
      roles: [AppRoles.Admin],
      pagetitle: 'Absenz Bearbeiten'}
  },
  {
    path: 'noaccess',
    component: NoAccessComponent
  }
];
