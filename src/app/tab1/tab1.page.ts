import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';



interface Restaurant {
  coordinates: any;
  location: any;
  name: string;
  slug: string;
  geo: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {


 private apiKey = 'BCI6EpYEvqjJ_w0OMJOMct0dfTlKNEk2atnP9CMmAa6v_YCQ52klccdw5rDR3KzeqMZOM2UxQzgAQ8VpD3aCK8q4lZWgYxvs0ZZPL-sJ2_S7D2seNEhRibe3QLzvY3Yx';
 private apiHost = 'https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20';
  map: any;
 restaurants: Restaurant[] = [];

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
//     this.readApi("/restaurants/v2/list?queryPlaceValueCityId="+ cityId, options)
//       .subscribe((data: any) => {
//          console.log(data);
//         // this.restaurantData.name = data.data[0].name;
//         // this.restaurantData.slug = data.data[0].slug;
//         // this.restaurantData.geo.lat = data.data[0].geo.latitude;
//         // this.restaurantData.geo.lng = data.data[0].geo.longitude;
//         // console.log(this.restaurantData);

//         // // add marker for any restaurant using the api
//         // // latitude and longitude are strings, convert to number
//         // let lat = Number(this.restaurantData.geo.lat);
//         // let lng = Number(this.restaurantData.geo.lng);
        
//         // let marker = Leaflet.marker([lat, lng]);
//         // marker.addTo(this.map);

//         // // style the marker
//         // marker.bindPopup(this.restaurantData.name);
//         // marker.openPopup();
//         // //image for the marker
  

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
      
      ;        console.log(this.restaurantData);
    
  }

  readApi(Url: string, headers: any) {
    return this.http.get('https://the-fork-the-spoon.p.rapidapi.com' + Url, headers);
  }

  ngOnInit() { this.getPosition() }
  
  /** Add map */
  ionViewDidEnter() {
    this.loadMap();
    
  }

  /** Load map */
  loadMap() {
  //   this.map = Leaflet.map('mapId').setView([44.837789, -0.57918], 13);
  //   Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  //   }).addTo(this.map);

  //   this.map.locate({setView: true, maxZoom: 18}).on('locationFound', (e: { latlng: { lat: number; lng: number; }; }) => {
  //     console.log(e.latlng);
  //     this.getPosition()
  //    this.markers = Leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
  //   }
  //     )
  //   // add marker for any restaurant using the api
   
    
  // }
  this.map = Leaflet.map('mapId').setView([44.837789, -0.57918], 13);
    const tileLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 16
    });
    tileLayer.addTo(this.map); 
    this.map.locate({setView: true, maxZoom: 16}).on('locationFound', (e: { latlng: { lat: number; lng: number; }; }) => {
    console.log(e.latlng);
    this.getPosition()
    this.markers = Leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
  }, (err: any) => {
    console.log(err);
  }
    )
  // call getRestaurants() here
  this.getRestaurants(44.837789, -0.57918);
  }
 
  getRestaurants(latitude:any, longitude:any) {
    let headers = new HttpHeaders({
      'x-Rapidapi-Host': 'the-fork-the-spoon.p.rapidapi.com',
      "X-Rapidapi-Key": "637ce2abdbmsh1b6a2c2d5afaaf5p1900dbjsn91a6160932ed",
      "Content-Type": "application/json"


  });
  let cityId = 60566;
  let options = { headers: headers };
    this.readApi("/restaurants/v2/list?queryPlaceValueCityId="+ cityId, options)
      .subscribe((data: any) => {
         console.log(data);


for (let i = 0; i < data.data.length; i++) {  
  let lat = Number(data.data[i].geo.latitude);
  let lng = Number(data.data[i].geo.longitude);
  let marker = Leaflet.marker([lat, lng]);
  marker.addTo(this.map);
  marker.bindPopup(data.data[i].name, data.data[i].mainPhotoSrc);
  marker.openPopup();
// image of the restaurant
  let image = data.data[i].mainPhotoSrc;


      }
    }
      
      );        console.log(this.restaurantData);
      

}


handleChange(event:any) {
  const query = event.target.value.toLowerCase();
  this.restaurants = this.restaurants.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(query);
  });
  this.addMarkers();

}


  addMarkers(): void {
    for (let i = 0; i < this.restaurants.length; i++) {
      const restaurant = this.restaurants[i];
      const marker = Leaflet.marker([restaurant.coordinates.latitude, restaurant.coordinates.longitude]);
      marker.addTo(this.map).bindPopup(`<b>${restaurant.name}</b><br>${restaurant.location.address1}`);
    }
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
  addMarker(latitude:any, longitude:any, popup:any) {
    Leaflet.marker([latitude, longitude]).addTo(this.map).bindPopup(popup);
  }
  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      this.center = Leaflet.latLng([position.coords.latitude, position.coords.longitude]);
      this.addMarker(position.coords.latitude, position.coords.longitude, "Current Location");
    }, (error) => {
      console.log(error);
    });
  }


  // fetch api fork and the spoon 


}
