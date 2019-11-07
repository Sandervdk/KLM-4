import {Injectable} from '@angular/core';
import {FuelwagonService} from './fuelwagon/fuelwagon.service';
import {LayerGroup} from 'leaflet';
import {WagonTypes} from '../../models/enums/wagonTypes';

@Injectable({
  providedIn: 'root'
})
export class WagonsService {
  private allWagons: any[] = [];
  private readonly fuelWagons: LayerGroup;

  /**
   * This constructor is responsible for making the layers for all the wagons used
   * to be shown on the map
   *
   * @param FuelWagonService
   */
  constructor(private FuelWagonService: FuelwagonService) {
    this.fuelWagons = FuelWagonService.getFuelWagonsLayer();
    // fill an global array with all the wagons
    this.allWagons.push(
      ...this.FuelWagonService.getFuelWagons() // Changes the object and gives the actual values
    );
  }

  /**
   * This method will create a new wagon and push it to the
   *  array which contains all wagons
   *
   * @param wagon all the details for the wagon
   */
  createNewWagon(wagon) {
    const title: string = wagon.title;
    const type: WagonTypes = wagon.type;
    const lastSeen = {lat: 52.311720, long: 4.767863};

    switch (type) {
      case WagonTypes.STIKSTOFWAGEN:
        this.allWagons.push({id: Math.round(Math.random() * this.allWagons.length), title, type, lastSeen});
        // new FuelWagon()
        break;
      case WagonTypes.BANDENWAGEN:
        this.allWagons.push({id: Math.round(Math.random() * this.allWagons.length), title, type, lastSeen});
        break;
      case WagonTypes.EQUIPMENT:
        this.allWagons.push({id: Math.round(Math.random() * this.allWagons.length), title, type, lastSeen});
        break;
      case WagonTypes.SKYDROLWAGEN:
        this.allWagons.push({id: Math.round(Math.random() * this.allWagons.length), title, type, lastSeen});
        break;
    }
  }

  /**
   * This method returns the layer that can be shown on the map of all wagons
   */
  getFuelWagonsLayer() {
    return this.fuelWagons;
  }

  /**
   * This method will return all the wagons that exists in an Array
   */
  getAllWagons() {
    return this.allWagons;
  }
}
