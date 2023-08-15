import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { AddressService } from '../services/address/address.service';

@Component({
  selector: 'app-record-attendance',
  templateUrl: './record-attendance.page.html',
  styleUrls: ['./record-attendance.page.scss'],
})
export class RecordAttendancePage implements OnInit {

  isSubmitted = false;
  location: any = {};
  isLocationFetched!: boolean;
  center: any;
  update!: boolean;
  id: any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private addressService: AddressService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkForUpdate();
  }

  async back() {
    this.navCtrl.back();
  }

  checkForUpdate() {
    this.isLoading = true;
    this.location.location_name = 'Locating...';
    this.isLocationFetched = false;
    this.route.queryParams.subscribe(async(data) => {
      console.log('data: ', data);
      if(data['data']) {
        const address = JSON.parse(data['data']);
        this.center = {
          lat: address.lat,
          lng: address.lng
        };
        console.log('center: ', this.center);
        
        this.update = true;
        this.location.lat = this.center.lat;
        this.location.lng = this.center.lng;
        this.location.address = address.address;
        this.location.location_name = address.title;
        this.id = address.id;
        setTimeout(async() => {
          await this.initForm(address);
          this.toggleFetched();
        }, 3000);
      } else {
        this.update = false;
        this.initForm();
      }
    });
    

  }

  initForm(address?: any) {
    let data: any = {
      title: null,
      house: null,
      landmark: null
    };
    if(address) {
      data = {
        title: address.title,
        house: address.house,
        landmark: address.landmark
      };
    } 
    // this.formData(data);
  }

  // formData(data?: any) {
  //   this.form = new FormGroup({
  //     title: new FormControl(data.title, {validators: [Validators.required]}),
  //     house: new FormControl(data.house, {validators: [Validators.required]}),
  //     landmark: new FormControl(data.landmark, {validators: [Validators.required]}),
  //   });
  //   this.isLoading = false;
  // }

  fetchLocation(event: any) {
    this.location = event;
    console.log('location: ', this.location);
    this.isLocationFetched = true;
  }
  
  toggleFetched() {
    this.isLocationFetched = !this.isLocationFetched;
  }

  toggleSubmit() {
    this.isSubmitted = !this.isSubmitted;
  }

  // async onSubmit() {
  //   try {
  //     this.toggleSubmit();
  //     console.log(this.form);
  //     if(!this.form.valid || !this.isLocationFetched) {
  //       this.toggleSubmit();
  //       return;
  //     }
  //     const data = {
  //       title: this.form.value.title,
  //       landmark: this.form.value.landmark,
  //       house: this.form.value.house,
  //       address: this.location.address,
  //       lat: this.location.lat,
  //       lng: this.location.lng,
  //     };
  //     console.log('address: ', data);
  //     if(!this.id) await this.addressService.addAddress(data);
  //     else await this.addressService.updateAddress(this.id, data);
  //     this.navCtrl.back();
  //     this.toggleSubmit();
  //   } catch(e) {
  //     console.log(e);
  //     this.global.errorToast();
  //   }

  // }
}
