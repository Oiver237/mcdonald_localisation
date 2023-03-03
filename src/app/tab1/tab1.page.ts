
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MongoClient } from 'mongodb';


import { latLng, MapOptions, Map, marker, Marker } from 'leaflet';
import * as L from 'leaflet';
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

//  database = 'mongodb://localhost:27017';
//  client = new MongoClient(this.database);

// // connect to the database
// async connect() {
//   await this.client.connect();
//   console.log('Connected to database');
// }

// // use the database
// async useDatabase() {
//   const database = this.client.db('restaurant');
//   console.log('Using database');

//   // veriify if the collection exists
//   const collections = await database.listCollections().toArray();
//   console.log('Collections: ', collections);
//   if (collections.length === 0) {
//     console.log('Creating collection');
//     await database.createCollection('restaurants');
//   }else{
//     console.log('Collection already exists');
//   }
// }

  
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
  latitude!: number;
  longitude!: number;
  constructor(public http: HttpClient) { 
   	// API Call
    

		let headers = new HttpHeaders({
			'x-rapidapi-host': 'the-fork-the-spoon.p.rapidapi.com',
			'x-rapidapi-key': '34f5317b57msh9070f3a81a2c21cp108d50jsn8513f7ab3382',


		});


      
      console.log(this.restaurantData);
    
  }

  readApi(Url: string, headers: any) {
    return this.http.get('https://the-fork-the-spoon.p.rapidapi.com' + Url, headers);
  }

  ngOnInit() { 
    this.map = L.map('mapId').setView([44.837789, -0.57918], 13);
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 16
    });
    tileLayer.addTo(this.map); 
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(this.map);
  }
  
  /** Add map */
  ionViewDidEnter() {
    this.loadMap();
    
    
  }


  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.showOnMap(this.latitude, this.longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showOnMap(latitude: any, longitude: any) {
    if (this.markers) {
      this.map.removeLayer(this.markers);
    }
    this.markers = L.marker([latitude, longitude], {icon: L.icon({ iconUrl: 'assets/marker-icon.png', iconSize: [50, 50] })}).addTo(this.map);
    console.log(this.markers);
    console.log(latitude, longitude);
    this.map.setView([latitude, longitude], 13);
    this.markers.bindPopup('You are here').openPopup();

    this.map.locate({setView: true, maxZoom: 16}).on('locationFound', (e: { latlng: { lat: number; lng: number; }; }) => {
      console.log(e.latlng);
      this.getCurrentLocation();

        
    }), (err: any) => {
      console.log(err);
    }
      

  
  }
  /** Load map */
  loadMap() {
 
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
  // custom violet marker
  const myIcon = L.icon({
    iconUrl: 'assets/leaf-red.png',
    iconSize: [30, 30],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  });

  // add marker
  const marker = L.marker([lat, lng], {icon: myIcon});

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
      const marker = L.marker([restaurant.coordinates.latitude, restaurant.coordinates.longitude]);
      marker.addTo(this.map).bindPopup(`<b>${restaurant.name}</b><br>${restaurant.location.address1}`);
    }
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
  addMarker(latitude:any, longitude:any, popup:any) {
    L.marker([latitude, longitude]).addTo(this.map).bindPopup(popup);
  }
  getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      this.center = L.latLng([position.coords.latitude, position.coords.longitude]);
      this.addMarker(position.coords.latitude, position.coords.longitude, "Current Location");
    }, (error) => {
      console.log(error);
    });
  }


  // fetch api fork and the spoon 


}

