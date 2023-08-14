import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-record-attendance',
  templateUrl: './record-attendance.page.html',
  styleUrls: ['./record-attendance.page.scss'],
})
export class RecordAttendancePage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  async back() {
    this.navCtrl.back();
  }

}
