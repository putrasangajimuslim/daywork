import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { AddScheduleDatePage } from '../add-schedule-date/add-schedule-date.page';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.page.html',
  styleUrls: ['./add-schedule.page.scss'],
})
export class AddSchedulePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  event = {
    title: '',
    desc: '',
  }

  dateTimeSelected = 'Pilih Tanggal';
  datas: any = [];
  showStart: boolean = false;
  // isModalScheduleDateOpen: boolean = false;
  isDatabackdropDismiss: any = [];
  
  constructor(
    private modalCtrl: ModalController,
    ) {
     }

  close() {
    this.modalCtrl.dismiss();
  }

  async selectDate() {
    const modal = await this.modalCtrl.create({
      component: AddScheduleDatePage,
      cssClass: 'modal-add-schedule-date',
      backdropDismiss: true,
    });

    this.close();

    await modal.present();

    modal.onDidDismiss().then((data) => {
      const dateTime = data.data == undefined ? "" : data.data;
      const role = data.role == undefined ? "" : data.role; 
      this.datas.push('sasa', role);
      this.sendParamDidmiss(data);
    });
  }

  async sendParamDidmiss(data: any) {
    this.dateTimeSelected = this.datas[0];

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
