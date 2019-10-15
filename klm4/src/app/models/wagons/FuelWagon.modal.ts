import { Wagon } from "./Wagon.modal";

export class FuelWagon extends Wagon {
  constructor(id: number, title: string, lastSeen: {}) {
    super(id, title, lastSeen);
  }
}
