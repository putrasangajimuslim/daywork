import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordAttendancePageRoutingModule } from './record-attendance-routing.module';

import { RecordAttendancePage } from './record-attendance.page';
import { MapComponent } from '../components/map/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordAttendancePageRoutingModule
  ],
  declarations: [RecordAttendancePage, MapComponent]
})
export class RecordAttendancePageModule {}
