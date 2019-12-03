import {WagonTypes} from '../enums/wagonTypes';
import {LatLng} from "leaflet";
import {EquipmentStatus} from "../enums/equipmentStatus";

export class Wagon {
  private id: number;
  private title: string;
  private lastSeen: LatLng;
  private wagonType: WagonTypes;
  private equipmentStatus: EquipmentStatus;

  constructor(id: number, title: string, lastSeen: LatLng, wagonType: WagonTypes, equipmentStatus: EquipmentStatus) {
    this.id = id;
    this.title = title;
    this.lastSeen = lastSeen;
    this.wagonType = wagonType;
    this.equipmentStatus = equipmentStatus;
  }

  getID() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getLastSeen() {
    return this.lastSeen;
  }

  getWagonType() {
    return this.wagonType;
  }

  getEquipmentStatus() {
    return this.equipmentStatus;
  }
}
