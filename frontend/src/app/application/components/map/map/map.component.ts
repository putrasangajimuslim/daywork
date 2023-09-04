import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, SimpleChanges } from '@angular/core';
import { GoogleMapsService } from 'src/app/application/services/google-maps/google-maps.service';
import { LocationService } from 'src/app/application/services/location/location.service';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {

  @ViewChild('map', {static: true}) mapElementRef!: ElementRef;
  googleMaps: any;
  map: any;
  marker: any;
  @Input() update = false;
  @Input() center = { lat: 28.649944693035188, lng: 77.23961776224988 };
  @Output() location: EventEmitter<any> = new EventEmitter();
  @Input() isLocationFetched: boolean = true;
  mapListener: any;
  // image = null;
  imageSource: any;

  constructor(
    private maps: GoogleMapsService,
    private renderer: Renderer2,
    private locationService: LocationService,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // await this.loadMap();

    // try {
    //   const position = await this.locationService.getCurrentLocation();
    //   if (position) {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //     this.recenterMap();
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  // async recenterMap() {
  //   if (this.map && this.center) {
  //     const googleMaps: any = this.googleMaps;
  //     const newCenter = new googleMaps.LatLng(this.center.lat, this.center.lng);
  //     this.map.setCenter(newCenter);
  //     this.map.setZoom(15);
  //     this.addMarker(newCenter);
  //   }
  // }

  async ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
    // this.isLocationFetched = true;
    try {
      if(!this.update) {
        const position = await this.locationService.getCurrentLocation();
        if (position) {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          await this.loadMap();
          this.getAddress(this.center.lat, this.center.lng);
        }
      } else {
        await this.loadMap();
      }
    } catch(e) {
      console.log(e);
      this.loadMap();
      // this.getAddress(this.center.lat, this.center.lng);
    }
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.maps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const style = [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [
            { saturation: -100 }
          ]
        }
      ];
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 10,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false,
        overviewMapControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [googleMaps.MapTypeId.ROADMAP, 'SwiggyClone']
        }
      });

      const refreshButton = document.getElementById('btnRefresh');
      refreshButton?.addEventListener('click', () => {
            this.removeMarker();
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const myLocation = new googleMaps.LatLng(position.coords.latitude, position.coords.longitude);
                  
                  this.map.setCenter(myLocation);
                  this.map.setZoom(16);
                  this.addMarker(myLocation);
                },
                (error) => {
                  console.error('Error getting location:', error);
                }
              );
            } else {
              console.error('Geolocation is not supported by this browser.');
            }
      });

      const addressData = await this.maps.getAddressOfficeWork();

      this.renderer.addClass(mapEl, 'visible');

      setTimeout(() => {
        this.map.setZoom(16);
        this.addMarker(location);

        const loc = {
          location_name: addressData.address_components[0].short_name,
          address: addressData.formatted_address,
          lat: addressData.geometry.location.lat,
          lng: addressData.geometry.location.lng,
        };
  
        const svgMarker = {
          path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
          fillColor: "blue",
          fillOpacity: 0.6,
          strokeWeight: 0,
          rotation: 0,
          scale: 2,
          anchor: new googleMaps.Point(0, 20),
        };
  
        const marker2  = new googleMaps.Marker({
          position: new googleMaps.LatLng(loc.lat, loc.lng),
          icon: svgMarker,
          map: this.map,
        });
        
      }, 3000);

      // Aktifkan My Location
      // const myLocationButton = document.createElement('button');
      // myLocationButton.textContent = 'My Location';
      // myLocationButton.classList.add('custom-map-control');
      // this.map.controls[googleMaps.ControlPosition.RIGHT_BOTTOM].push(myLocationButton);
  
      // // Tambahkan event listener untuk tombol My Location
      // myLocationButton.addEventListener('click', () => {
      //   if (navigator.geolocation) {
      //     navigator.geolocation.getCurrentPosition(
      //       (position) => {
      //         const myLocation = new googleMaps.LatLng(position.coords.latitude, position.coords.longitude);
      //         this.map.setCenter(myLocation);
      //         this.addMarker(myLocation);
      //       },
      //       (error) => {
      //         console.error('Error getting location:', error);
      //       }
      //     );
      //   } else {
      //     console.error('Geolocation is not supported by this browser.');
      //   }
      // });
  
      // const marker2Icon = {
      //   url: 'assets/icon/location-pin.png',
      //   size: new googleMaps.Size(20, 32),
      // };

    } catch(e) {
      console.log(e);
    }
  }

  async fetchLocation() {
    try {
      this.marker.setMap(null); // Menghapus marker yang ada sebelumnya

      const position = await this.locationService.getCurrentLocation();
      if (position) {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        this.center = newCenter; // Mengatur pusat peta ke lokasi baru
        this.loadMap(); // Memuat ulang peta dengan lokasi baru
        this.getAddress(newCenter.lat, newCenter.lng); // Mendapatkan alamat lokasi baru
      }
    } catch (e) {
      console.log(e);
    }
  }

  async removeMarker() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  async addMarker(location: any) {
    let googleMaps: any = this.googleMaps;
    this.marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      draggable: false,
    });
  }

  async getAddress(lat: any, lng: any) {
    try {
      const result = await this.maps.getAddress(lat, lng);
      const loc = {
        location_name: result.address_components[0].short_name,
        address: result.formatted_address,
        lat,
        lng
      };
      this.location.emit(loc);
    } catch(e) {
      console.log(e);
    }
  }

  async openCamera() {
    const result = await this.maps.getAddress(this.center.lat, this.center.lng);

    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100
      });

      this.imageSource = image.dataUrl;
      const formData = new FormData();
      formData.append('image', this.imageSource);
      formData.append('lat', this.center.lat.toString());
      formData.append('lng', this.center.lng.toString());
      formData.append('provinsi', result.address_components[7].short_name);

      const response = await axios.post('http://localhost:8000/api/get-data-waktu-kehadiran', formData);
      console.log(response.data);
      console.log(response.data.success);
    } catch (error) {
      console.error(error);
    }
  }

  async ngOnDestroy() {
    if(!this.mapListener) this.googleMaps.event.removeListener(this.mapListener);
  }

}
