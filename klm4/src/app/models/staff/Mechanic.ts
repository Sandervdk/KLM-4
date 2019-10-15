import {Employee} from './Employee';
import {Functions} from './Functions';

export class Mechanic extends Employee {

  constructor(name: string, lastname: string) {
    super(name, lastname, Functions.MECHANIC);
  }

  getRole(): string {
    return super.getRole();
  }
}
