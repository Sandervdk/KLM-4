import {Injectable} from '@angular/core';
import {icon, LatLng, LayerGroup, marker, Marker} from 'leaflet';
import {FuelWagon} from '../../../models/wagons/FuelWagon.modal';
import {WagonTypes} from '../../../models/enums/wagonTypes';

declare let L; // used for Leaflet.js

@Injectable({
  providedIn: 'root'
})

export class FuelwagonService {
  private static FUEL_WAGON_ICON = 'https://png.pngtree.com/svg/20170825/nitrogen_dioxide_898.png';

  public long = 4.767863;
  public lat = 52.311720;
  private teehee: LatLng;
  private fuelWagonMarkers: Marker[] = [];
  private fuelWagonslayer: LayerGroup;

  private fuelWagons: any[] = [
    {
      id: 0,
      title: 'Stikstof wagen',
      lastSeen: {lat: this.lat, long: this.long},
      type: WagonTypes.NITROGENCART
    },
    {
      id: 1,
      title: 'Stikstof wagen',
      lastSeen: {lat: this.lat + 0.00123, long: this.long},
      type: WagonTypes.NITROGENCART
    },
    {
      id: 2,
      title: 'Stikstof wagen',
      lastSeen: {lat: this.lat - 0.01023, long: this.long},
      type: WagonTypes.NITROGENCART
    },
    {
      id: 3,
      title: 'Stikstof wagen',
      lastSeen: {lat: this.lat - 0.01167, long: this.long},
      type: WagonTypes.NITROGENCART
    },
    {
      id: 4,
      title: 'Stikstof wagen',
      lastSeen: {lat: this.lat - 0.01435, long: this.long},
      type: WagonTypes.NITROGENCART
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
  private createFuelWagons() {
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
