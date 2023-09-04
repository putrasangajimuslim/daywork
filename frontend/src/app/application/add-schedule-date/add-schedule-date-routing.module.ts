import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddScheduleDatePage } from './add-schedule-date.page';

const routes: Routes = [
  {
    path: '',
    component: AddScheduleDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddScheduleDatePageRoutingModule {}
