import {Injectable} from '@angular/core';
import {icon, LatLng, LayerGroup, marker, Marker} from 'leaflet';
import {FuelWagon} from '../../../models/wagons/FuelWagon.modal';
import {WagonTypes} from '../../../models/enums/wagonTypes';
import {Wagon} from '../../../models/wagons/Wagon.modal';
import {WagonsService} from '../wagons.service';

declare let L; // used for Leaflet.js

@Injectable({
  providedIn: 'root'
})

/**
 * This class is will create the markers for the fuelwagons
 *
 * @author Acdaling Edusei
 */
export class FuelwagonService {
  public long = 4.767863;
  public lat = 52.311720;
  private teehee: LatLng;
  private fuelWagonMarkers: Marker[] = []; // marker points on the map
  private fuelWagonslayer: LayerGroup; // all the markers of this Cart type

  private fuelWagons: any[] = [
    {
      id: 0,
      title: WagonTypes.FUEL_CART,
      lastSeen: {lat: this.lat, long: this.long},
      type: WagonTypes.FUEL_CART
    },
    {
      id: 1,
      title: WagonTypes.FUEL_CART,
      lastSeen: {lat: this.lat + 0.00123, long: this.long},
      type: WagonTypes.FUEL_CART
    },
    {
      id: 2,
      title: WagonTypes.FUEL_CART,
      lastSeen: {lat: this.lat - 0.01023, long: this.long},
      type: WagonTypes.FUEL_CART
    },
    {
      id: 3,
      title: WagonTypes.FUEL_CART,
      lastSeen: {lat: this.lat - 0.01167, long: this.long},
      type: WagonTypes.FUEL_CART
    },
    {
      id: 4,
      title: WagonTypes.FUEL_CART,
      lastSeen: {lat: this.lat - 0.01435, long: this.long},
      type: WagonTypes.FUEL_CART
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
            iconUrl: Wagon.WAGON_ICONS.MAINTENANCE
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
