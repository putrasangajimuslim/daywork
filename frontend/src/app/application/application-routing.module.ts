import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationPage } from './application.page';

const routes: Routes = [
  {
    path: '',
    component: ApplicationPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.SchedulePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/application/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/application/home',
    pathMatch: 'full'
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfilePageModule)
  },
  {
    path: 'record-attendance',
    loadChildren: () => import('./record-attendance/record-attendance.module').then(m => m.RecordAttendancePageModule)
  },
  {
    path: 'add-schedule',
    loadChildren: () => import('./add-schedule/add-schedule.module').then( m => m.AddSchedulePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationPageRoutingModule { }
