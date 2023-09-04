import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { AddSchedulePage } from '../add-schedule/add-schedule.page';

@Component({
  selector: 'app-add-schedule-date',
  templateUrl: './add-schedule-date.page.html',
  styleUrls: ['./add-schedule-date.page.scss'],
})
export class AddScheduleDatePage implements OnInit {

  @ViewChild(IonDatetime) ionDatetime!: IonDatetime;
  datetimeValue: string = '';
  constructor(private modalCtrl: ModalController) { }

  async close() {
    this.modalCtrl.dismiss();

    const modalPertama = await this.modalCtrl.create({
      component: AddSchedulePage,
      cssClass: 'schedule-modal',
      backdropDismiss: false,
    });
    return await modalPertama.present();
  }

  async selesai() {
    const originalValue = this.ionDatetime.value as string;

    if (originalValue) {
      const parts = originalValue.split('T');
      if (parts.length === 2) {
        const datePart = parts[0];
        const timePart = parts[1];
        this.datetimeValue = `${datePart} ${timePart}`;

        this.modalCtrl.dismiss(this.datetimeValue);
      }
    }
  }
  ngOnInit() {
  }

}
