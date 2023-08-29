import { Component, OnInit } from '@angular/core';
import { CalendarMode } from 'ionic7-calendar';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  viewTitle = '';

  constructor() { }

  ngOnInit() {
  }

}
