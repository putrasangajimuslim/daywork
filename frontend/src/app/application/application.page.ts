import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {

  selectTab: any;
  @ViewChild('tabs') tabs: any = IonTabs;

  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event: any) {
    this.selectTab = this.tabs.getSelected();
  }

}
