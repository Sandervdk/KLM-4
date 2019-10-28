import {Injectable} from '@angular/core';
import {FuelwagonService} from './fuelwagon/fuelwagon.service';
import {LayerGroup} from 'leaflet';
import {NgForm} from '@angular/forms';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {FuelWagon} from '../../models/wagons/FuelWagon.modal';

@Injectable({
  providedIn: 'root'
})
export class WagonsService {
  private allWagons: any[] = [];
  private fuelWagons: LayerGroup;

  constructor(private FuelWagonService: FuelwagonService) {
    this.fuelWagons = FuelWagonService.getFuelWagonsLayer();
    this.allWagons.push(
      ...this.FuelWagonService.getFuelWagons()
    );
  }

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

  getFuelWagonsLayer() {
    return this.fuelWagons;
  }

  getAllWagons() {
    return this.allWagons;
  }
}
