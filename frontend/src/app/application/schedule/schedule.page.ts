import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddSchedulePage } from '../add-schedule/add-schedule.page';
import { ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {  

  prevSlideIndex = 0;

  weekDatas: { day: string; number: string; }[] = []; 
  today: string = ''; 
  currentMonthName: string = '';
  waktuArray: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute
    ) { 
    }

    customCalendar() {
      let currentDate = new Date();

      let currYear = currentDate.getFullYear();
      let currMonth = currentDate.getMonth();

      let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      this.currentMonthName = monthNames[currMonth] + ', ' + currYear;

      this.today = currentDate.toLocaleDateString('id-ID', { day: 'numeric' });

      const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();

      const accumulateDate = lastDateofMonth - Number(this.today);

      // currentDate = new Date(currYear, currMonth, 1);

      // const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();

      // // Menghitung tanggal 4 hari ke depan dari hari ini
      // const fourDaysFromNow = new Date(currentDate);
      // fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4);

      // for (let day = 1; day <= lastDateofMonth; day++) {
      //   const dayOfWeek = currentDate.toLocaleDateString('id-ID', { day: 'numeric' });
      //   const dayOfWeekName = currentDate.toLocaleDateString('id-ID', { weekday: 'long' });

      //   const shortenedDayName = dayOfWeekName.substring(0, 3);

      //   // Memeriksa apakah tanggal dalam 4 hari ke depan
      //   const isWithinFourDays = currentDate <= fourDaysFromNow;

      //   this.weekDatas.push({ day: shortenedDayName, number: dayOfWeek });

      //   currentDate.setDate(currentDate.getDate() + 1);
      // }
      
      currentDate.setDate(currentDate.getDate() - 3);
      // Menambahkan 5 tanggal berikutnya ke dalam array
      for (let i = 0; i < accumulateDate; i++) {
        const dayOfWeek = currentDate.toLocaleDateString('id-ID', { day: 'numeric' });
        const dayOfWeekName = currentDate.toLocaleDateString('id-ID', { weekday: 'long' });
        
        const shortenedDayName = dayOfWeekName.substring(0, 3);

        this.weekDatas.push({ day: shortenedDayName, number: dayOfWeek });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      console.log(this.weekDatas);
      
    }

    async onSlideChange(ev: any) {
      const currentSlideIndex = ev.detail[0].realIndex || ev.detail[0].activeIndex;

      if (currentSlideIndex > this.prevSlideIndex) {
       this.nextDateCalendar();
      } else if (currentSlideIndex < this.prevSlideIndex) {
        this.prevDateCalendar();
      }
  
      this.prevSlideIndex = currentSlideIndex;
    }

    async prevDateCalendar() {
      // console.log('kekiri');
    }

    async nextDateCalendar() {
      // console.log('kekanan');
    }

    async customTimeSchedule() {

      for (let jam = 0; jam <= 23; jam++) {
        const waktu = `${jam.toString().padStart(2, '0')}:00`;
  
        this.waktuArray.push(waktu);
      }
    }

    async selectedDateSchedule(date: any) {
      console.log(date);
      
    }
    
  ngOnInit() {  
    this.customCalendar();
  }

}
