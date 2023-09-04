import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddScheduleDatePageRoutingModule } from './add-schedule-date-routing.module';

import { AddScheduleDatePage } from './add-schedule-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddScheduleDatePageRoutingModule
  ],
  declarations: [AddScheduleDatePage]
})
export class AddScheduleDatePageModule {}
