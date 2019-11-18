import {Employee} from './Employee';
import {Functions} from './Functions';

export class Mechanic extends Employee {

  constructor(name: string, lastname: string, email: string, password: string) {
    super(name, lastname, email, password, Functions.MECHANIC);
  }

  getId(): number {
    return super.getId();
  }

  getRole(): string {
    return super.getRole();
  }
}
