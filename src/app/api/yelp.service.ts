import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as leaflet from 'leaflet';
@Injectable({
  providedIn: 'root'
})
export class YelpService {
  private apiKey = 'BCI6EpYEvqjJ_w0OMJOMct0dfTlKNEk2atnP9CMmAa6v_YCQ52klccdw5rDR3KzeqMZOM2UxQzgAQ8VpD3aCK8q4lZWgYxvs0ZZPL-sJ2_S7D2seNEhRibe3QLzvY3Yx';
  private apiUrl = 'https://api.yelp.com/v3/businesses/search';
  markers: any;
  map:any;
  restaurants: any[] = [];
  constructor(private http: HttpClient) { }
  addMarker(latitude: number, longitude: number, popup: ((layer: leaflet.Layer) => leaflet.Content) | leaflet.Content | leaflet.Popup) {
    this.markers = leaflet.marker([latitude, longitude]).addTo(this.map).bindPopup(popup);
  }
  searchRestaurants(latitude: number, longitude: number) {
    const API_KEY = this.apiKey;
    const ENDPOINT = 'https://api.yelp.com/v3/businesses/search';
    const HEADERS = { 'Authorization': `Bearer ${API_KEY}` };
    
    const params = {
      latitude: latitude,
      longitude: longitude,
      categories: 'restaurants',
      limit: 10
    };
    
    this.http.get(ENDPOINT, { headers: HEADERS, params: params }).subscribe((data: any) => {
      this.restaurants = data.businesses;
      
      for (const restaurant of this.restaurants) {
        this.addMarker(restaurant.coordinates.latitude, restaurant.coordinates.longitude, restaurant.name);
      }
    }, (error) => {
      console.log('Error getting restaurants', error);
    });
  }
}
