import {Employee} from './Employee';
import {Functions} from './Functions';

/**
 * This class is a Modal for the runners
 */
export class Runner extends Employee {
  constructor(name: string, lastname: string, email: string, password: string) {
    super(name, lastname, email, password, Functions.RUNNER);
  }

  getId(): number {
    return super.getId();
  }

  getRole(): string {
    return super.getRole();
  }
}
