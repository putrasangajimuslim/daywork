import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordAttendancePage } from './record-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: RecordAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordAttendancePageRoutingModule {}
