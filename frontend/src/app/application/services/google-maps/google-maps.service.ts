import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private apiKey: string = '';
  // private apiKey: string = 'AIzaSyBOP90ra6mh1UJdPBEmH7W_A_HcZXSaDxU';
  constructor(private http: HttpClient) { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
     return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        this.apiKey
         + '&libraries=places';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Map SDK is not Available');
        }
      };
    });
  }

  getAddress(lat: number, lng: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`
        )
        .pipe(
          map(geoData => {
            if(!geoData || !geoData.results || geoData.results.length === 0) throw(null);
            return geoData.results[0];
          })
        ).subscribe(data => {
          resolve(data);
        }, e => {
          reject(e);
        });
    });
  }

  async getAddressOfficeWork(): Promise<any> {
    // const lat = 2411936951098985;
    // const lng = 82602450682168;
    // return new Promise((resolve, reject) => {
      
    //   this.http.get<any>(
    //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`
    //     )
    //     .pipe(
    //       map(geoData => {
    //         if(!geoData || !geoData.results || geoData.results.length === 0) throw(null);
    //         return geoData.results[0];
    //       })
    //     ).subscribe(data => {
    //       resolve(data);
    //     }, e => {
    //       reject(e);
    //     });
    // });

    const lat = -6.2412146086733316;
    const lng = 106.82545246663648;
  
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
  
    try {
      const response = await this.http.get<any>(url).toPromise();
      if (!response || !response.results || response.results.length === 0) {
        throw new Error('No results found.');
      }
      return response.results[0];
    } catch (error) {
      throw error;
    }
  }
}
