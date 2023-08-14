import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordAttendancePageRoutingModule } from './record-attendance-routing.module';

import { RecordAttendancePage } from './record-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordAttendancePageRoutingModule
  ],
  declarations: [RecordAttendancePage]
})
export class RecordAttendancePageModule {}
