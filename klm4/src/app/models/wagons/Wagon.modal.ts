import {WagonTypes} from '../enums/wagonTypes';

export class Wagon {
  private id: number;
  private title: string;
  private lastSeen: {};
  private wagonType: WagonTypes;

  constructor(id: number, title: string, lastSeen: {}, wagonType: WagonTypes) {
    this.id = id;
    this.title = title;
    this.lastSeen = lastSeen;
    this.wagonType = wagonType;
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
}
