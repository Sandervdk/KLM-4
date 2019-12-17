import {WagonTypes} from '../enums/wagonTypes';
import {LatLng} from 'leaflet';
import {EquipmentStatus} from '../enums/equipmentStatus';

/**
 * General attributes for CARTS
 */
export class Wagon {
  public static readonly WAGON_ICONS = {
    NOT_AVAILABLE: '../../../assets/images/icons/redPointer.png',
    AVAILABLE: '../../../assets/images/icons/greenPointer.png',
    MAINTENANCE: '../../../assets/images/icons/orangePointer.png'
  };
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
