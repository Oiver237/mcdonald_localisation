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

  constructor(public http: HttpClient) { 
   	// API Call
    restaurantData: {
      name: '';
      slug: '';
      geo: {
        lat: '';
        lng: '';
      };

    }

		let headers = new HttpHeaders({
			'x-rapidapi-host': 'the-fork-the-spoon.p.rapidapi.com',
			'x-rapidapi-key': '34f5317b57msh9070f3a81a2c21cp108d50jsn8513f7ab3382',


		});
    let options = { headers: headers };
    this.readApi("/restaurants/v2/list?queryPlaceValueCityId=60566&pageSize=30&pageNumber=1", options).subscribe(data => {
      console.log(data);

    }
    );
    
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

    // add marker for any restaurant using the api
  
    
  }


  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  // fetch api fork and the spoon 


}
