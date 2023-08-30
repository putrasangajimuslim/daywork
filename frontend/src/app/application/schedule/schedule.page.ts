import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent, CalendarMode } from 'ionic7-calendar';
import { AddSchedulePage } from '../add-schedule/add-schedule.page';

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
  
  constructor(private modalCtrl: ModalController) { }

  async openModalAddSchedule() {
    const modal = await this.modalCtrl.create({
      component: AddSchedulePage,
      cssClass: 'cal-modal-add-schedule',
      backdropDismiss: false,
    });

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
        }
        // Sekarang Anda dapat melakukan sesuatu dengan event yang telah diubah
        // Misalnya, menyimpannya ke penyimpanan atau memperbarui tampilan.
        console.log('Modified event:', event);
      }
    });    
  }

  ngOnInit() {
  }

}
