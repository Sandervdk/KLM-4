import {Wagon} from './Wagon.modal';
import {WagonTypes} from '../enums/wagonTypes';
import {EquipmentStatus} from "../enums/equipmentStatus";
import {LatLng} from "leaflet";

export class FuelWagon extends Wagon {
  constructor(id: number, title: string, lastSeen: LatLng) {
    super(id, title, lastSeen, WagonTypes.STIKSTOFWAGEN, EquipmentStatus.AVAILABLE);
  }
}
