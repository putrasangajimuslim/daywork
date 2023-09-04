import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent, CalendarMode } from 'ionic7-calendar';
import { AddSchedulePage } from '../add-schedule/add-schedule.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  eventSource = [];
  viewTitle = '';

  newDataModal: any = [];

  isBackdropDismissEnabled: boolean = false;
  
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute
    ) { 
    
    }

  async openModalAddSchedule() {
    const modal = await this.modalCtrl.create({
      component: AddSchedulePage,
      cssClass: 'schedule-modal',
      backdropDismiss: false,
    });

    modal.present();
  }

  ngOnInit() {
  }

}
