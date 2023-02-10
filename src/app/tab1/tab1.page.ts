import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  map: any;

  constructor() { }

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
  }


  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
