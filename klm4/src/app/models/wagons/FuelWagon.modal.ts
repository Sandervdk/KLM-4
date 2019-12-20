import {Wagon} from './Wagon.modal';
import {WagonTypes} from '../enums/wagonTypes';
import {EquipmentStatus} from '../enums/equipmentStatus';
import {LatLng} from 'leaflet';

export class FuelWagon extends Wagon {
  constructor(id: number, title: string, lat: number, lng) {
    super(id, title, lat, lng, WagonTypes.FUEL_CART, EquipmentStatus.AVAILABLE);
  }
}
