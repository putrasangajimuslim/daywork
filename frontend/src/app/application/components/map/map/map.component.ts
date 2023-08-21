import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { GoogleMapsService } from 'src/app/application/services/google-maps/google-maps.service';
import { LocationService } from 'src/app/application/services/location/location.service';

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
  mapListener: any;

  constructor(
    private maps: GoogleMapsService,
    private renderer: Renderer2,
    private locationService: LocationService
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  async initMap() {
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
        zoom: 18,
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
      // var mapType = new googleMaps.StyledMapType(style, { name: 'Grayscale' });
      // this.map.mapTypes.set('SwiggyClone', mapType);
      // this.map.setMapTypeId('SwiggyClone');
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker(location);
    } catch(e) {
      console.log(e);
    }
  }

  // addMarker(location: any) {
  //   let googleMaps: any = this.googleMaps;
  //   const icon = {
  //     url: 'assets/icon/location-pin.png',
  //     scaledSize: new googleMaps.Size(50, 50), 
  //   };
  //   this.marker = new googleMaps.Marker({
  //     position: location,
  //     map: this.map,
  //     icon: icon,
  //     draggable: true,
  //     animation: googleMaps.Animation.DROP
  //   });
  //   this.mapListener = this.googleMaps.event.addListener(this.marker, 'dragend', () => {
  //     this.getAddress(this.marker.position.lat(), this.marker.position.lng());
  //   });
  // }

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

  addMarker(location: any) {
    let googleMaps: any = this.googleMaps;
    this.marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      draggable: false,
      animation: googleMaps.Animation.DROP
    });
  }

  async getAddress(lat: any, lng: any) {
    try {
      const result = await this.maps.getAddress(lat, lng);
      console.log(result);
      const loc = {
        location_name: result.address_components[0].short_name,
        address: result.formatted_address,
        lat,
        lng
      };
      console.log(loc);
      this.location.emit(loc);
    } catch(e) {
      console.log(e);
    }
  }

  ngOnDestroy() {
    if(!this.mapListener) this.googleMaps.event.removeListener(this.mapListener);
  }

}
