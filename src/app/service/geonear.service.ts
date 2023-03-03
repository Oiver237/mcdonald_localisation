import { Injectable } from '@angular/core';
import { MongoClient } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class geonearService {
  private client: MongoClient;
  private database: any;

  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017');
    this.client.connect().then(() => {
      this.database = this.client.db('mydb');
    });
  }

  async getNearbyRestaurants(longitude: number, latitude: number, maxDistanceInMeters: number) {
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistanceInMeters
        }
      }
    };

    const results = await this.database.collection('restaurants').find(query).toArray();
    return results;
  }
}
