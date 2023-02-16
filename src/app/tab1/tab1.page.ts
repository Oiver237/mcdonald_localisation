import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {


 
  map: any;
  center: any;
  markers: any;
    restaurantData = {
      name: '',
      slug: '',
      geo: {
        lat: '',
        lng: ''
      },


    }
  constructor(public http: HttpClient) { 
   	// API Call
    let cityId = 60566;

		let headers = new HttpHeaders({
			'x-rapidapi-host': 'the-fork-the-spoon.p.rapidapi.com',
			'x-rapidapi-key': '34f5317b57msh9070f3a81a2c21cp108d50jsn8513f7ab3382',


		});
    let options = { headers: headers };
    this.readApi("/restaurants/v2/list?queryPlaceValueCityId="+ cityId, options)
      .subscribe((data: any) => {
         console.log(data);
        // this.restaurantData.name = data.data[0].name;
        // this.restaurantData.slug = data.data[0].slug;
        // this.restaurantData.geo.lat = data.data[0].geo.latitude;
        // this.restaurantData.geo.lng = data.data[0].geo.longitude;
        // console.log(this.restaurantData);

        // // add marker for any restaurant using the api
        // // latitude and longitude are strings, convert to number
        // let lat = Number(this.restaurantData.geo.lat);
        // let lng = Number(this.restaurantData.geo.lng);
        
        // let marker = Leaflet.marker([lat, lng]);
        // marker.addTo(this.map);

        // // style the marker
        // marker.bindPopup(this.restaurantData.name);
        // marker.openPopup();
        // //image for the marker
  

for (let i = 0; i < data.data.length; i++) {  
  let lat = Number(data.data[i].geo.latitude);
  let lng = Number(data.data[i].geo.longitude);
  let marker = Leaflet.marker([lat, lng]);
  marker.addTo(this.map);
  marker.bindPopup(data.data[i].name);
  marker.openPopup();
// image of the restaurant
  let image = data.data[i].mainPhotoSrc;


      }
    }
      
      );        console.log(this.restaurantData);
    
  }

  readApi(Url: string, headers: any) {
    return this.http.get('https://the-fork-the-spoon.p.rapidapi.com' + Url, headers);
  }

  ngOnInit() { }
  
  /** Add map */
  ionViewDidEnter() {
    this.loadMap();

  }

  /** Load map */
  loadMap() {
    this.map = Leaflet.map('mapId').setView([44.837789, -0.57918], 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.locate({setView: true, maxZoom: 18}).on('locationFound', (e: { latlng: { lat: number; lng: number; }; }) => {
      console.log(e.latlng);
     this.center = Leaflet.latLng([e.latlng.lat, e.latlng.lng]);
     this.markers = Leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    }
      )
    // add marker for any restaurant using the api
    this.getPosition()
    
  }


  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    }, (error) => {
      console.log(error);
    });
  }


  // fetch api fork and the spoon 


}
