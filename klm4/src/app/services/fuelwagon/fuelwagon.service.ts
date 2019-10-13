import {Injectable} from '@angular/core';
import {icon, LayerGroup, marker, Marker} from 'leaflet';
import {FuelWagon} from '../../models/FuelWagon.modal';

declare let L; // used for Leaflet.js

@Injectable({
  providedIn: 'root'
})

export class FuelwagonService {
  private static FUEL_WAGON_ICON = 'https://66.media.tumblr.com/1d8d45e656056a721465abf9d30951ae/tumblr_okg3shhv7d1uryh6jo6_250.jpg';

  public long = 4.766361511202604;
  public lat = 52.30678841808895;

  private fuelWagonMarkers: Marker[] = [];
  private fuelWagonslayer: LayerGroup;

  private fuelWagons = [
    {
      id: 0,
      title: 'Fuel Wagon',
      lastSeen: {lat: this.lat + 0.5555, long: this.long}
    },
    {
      id: 1,
      title: 'Fuel Wagon',
      lastSeen: {lat: this.lat + 0.0556, long: this.long}
    },
    {
      id: 2,
      title: 'Fuel Wagon',
      lastSeen: {lat: this.lat + 0.8586, long: this.long}
    },
    {
      id: 3,
      title: 'Fuel Wagon',
      lastSeen: {lat: this.lat + 1.8586, long: this.long}
    },
    {
      id: 4,
      title: 'Fuel Wagon',
      lastSeen: {lat: this.lat + 0.2255, long: this.long + 2}
    }
  ];

  constructor() {
    this.createFuelWagons();
  }

  /**
   * This method will create FuelWagons and markers for each wagon
   * there markers will be stored into an array that contains all of the locations.
   *
   * All the markers will be pinned onto a Layer that can be shown on the map
   */
  createFuelWagons() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.fuelWagons.length; i++) {
      const fuelWagon = new FuelWagon(
        this.fuelWagons[i].id,
        this.fuelWagons[i].title,
        this.fuelWagons[i].lastSeen);

      this.fuelWagonMarkers.push(// make marker for each of the FuelWagons
        marker([fuelWagon.getLastSeen()['lat'], fuelWagon.getLastSeen()['long']], {
          icon: icon({
            iconSize: [30, 30],
            iconAnchor: [13, 5],
            iconUrl: FuelwagonService.FUEL_WAGON_ICON
          })
        }).bindPopup(`${fuelWagon.getTitle()} (${fuelWagon.getID()})`)
      );
    }

    this.fuelWagonslayer = L.layerGroup(this.fuelWagonMarkers); // hold all the layers into one layerGroup
  }

  /**
   * @returns array of fuelWagons
   */
  getFuelWagons() {
    return this.fuelWagons;
  }

  /**
   * @returns LayerGroup with all the markers of the Fuelwagons
   */
  getFuelWagonsLayer() {
    return this.fuelWagonslayer;
  }
}
