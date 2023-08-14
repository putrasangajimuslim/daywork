import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

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
