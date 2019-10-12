import {Injectable} from '@angular/core';
import {FuelwagonService} from './fuelwagon/fuelwagon.service';
import {LayerGroup} from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class WagonsService {
  private fuelWagons: LayerGroup;

  constructor(private FuelWagonService: FuelwagonService) {
    this.fuelWagons = FuelWagonService.getFuelWagonsLayer();
  }

  getFuelWagonsLayer() {
    return this.fuelWagons;
  }
}
