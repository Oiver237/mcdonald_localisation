import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YelpService } from '../api/yelp.service';
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

    private apiKey = 'BCI6EpYEvqjJ_w0OMJOMct0dfTlKNEk2atnP9CMmAa6v_YCQ52klccdw5rDR3KzeqMZOM2UxQzgAQ8VpD3aCK8q4lZWgYxvs0ZZPL-sJ2_S7D2seNEhRibe3QLzvY3Yx';
    private apiUrl = 'https://api.yelp.com/v3/businesses/search';

    restaurants: any[] = [];
  
    constructor( private yelpService: YelpService) {}
    
    // searchRestaurants() {
    //   this.geolocation.getCurrentPosition().then((resp) => {
    //     const latitude = resp.coords.latitude;
    //     const longitude = resp.coords.longitude;
    //     this.yelpService.searchRestaurants(latitude, longitude).subscribe((data: any) => {
    //       this.restaurants = data.businesses;
    //     });
    //   }).catch((error) => {
    //     console.log('Error getting location', error);
    //   });
    // }
    
//   constructor(public http: HttpClient) { 
//    	// API Call
//     let cityId = 60566;

// 		let headers = new HttpHeaders({
// 			'x-rapidapi-host': 'the-fork-the-spoon.p.rapidapi.com',
// 			'x-rapidapi-key': '34f5317b57msh9070f3a81a2c21cp108d50jsn8513f7ab3382',


// 		});
//     let options = { headers: headers };
//     this.readApi("/restaurants/v2/list?queryPlaceValueCityId="+ cityId, options)
//       .subscribe((data: any) => {
//          console.log(data);

  

// for (let i = 0; i < data.data.length; i++) {  
//   let lat = Number(data.data[i].geo.latitude);
//   let lng = Number(data.data[i].geo.longitude);
//   let marker = Leaflet.marker([lat, lng]);
//   marker.addTo(this.map);
//   marker.bindPopup(data.data[i].name);
//   marker.openPopup();
// // image of the restaurant
//   let image = data.data[i].mainPhotoSrc;


//       }
//     }
      
//       );        console.log(this.restaurantData);
    
//   }

  // readApi(Url: string, headers: any) {
  //   return this.http.get('https://the-fork-the-spoon.p.rapidapi.com' + Url, headers);
  // }

  ngOnInit() { }
  
  /** Add map */
  ionViewDidEnter() {
    this.loadMap();

  }

  loadMap() {
          
    this.map = Leaflet.map('mapId').setView([44.837789, -0.57918], 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      
      this.yelpService.addMarker(latitude, longitude, 'Vous êtes ici');
      this.yelpService.searchRestaurants(latitude, longitude);

      console.log(this.yelpService.searchRestaurants(latitude, longitude));
    }, (error) => {
      console.log('Error getting location', error);
    });
  }
  



  /** Load map */
  // loadMap() {


  //   this.map.locate({setView: true, maxZoom: 18}).on('locationFound', (e: { latlng: { lat: number; lng: number; }; }) => {
  //     console.log(e.latlng);
  //    this.center = Leaflet.latLng([e.latlng.lat, e.latlng.lng]);
  //    this.markers = Leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
  //   }
  //     )
  //   // add marker for any restaurant using the api
  //   this.getPosition()
    
  // }


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
