import {Wagon} from './Wagon.modal';
import {WagonTypes} from '../enums/wagonTypes';

export class FuelWagon extends Wagon {
  constructor(id: number, title: string, lastSeen: {}) {
    super(id, title, lastSeen, WagonTypes.STIKSTOFWAGEN);
  }
}
