import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { CareerComponent } from './pages/career/career.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { JobApplicationFormComponent } from './pages/job-application-form/job-application-form.component';
import { ProjectComponent } from './pages/project/project.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'career',
        component: CareerComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'apply/:id',
    component: JobApplicationFormComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],  
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'project',
        component: ProjectComponent
      }
    ]
  },
  { path: '**', redirectTo: 'main' }
]