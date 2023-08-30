import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';

import { NgCalendarModule } from 'ionic7-calendar';

import localeId from '@angular/common/locales/id';
registerLocaleData(localeId);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [SchedulePage],
  providers: [
    { provide: LOCALE_ID, useValue: 'id-ID'}
  ]
})
export class SchedulePageModule {}
