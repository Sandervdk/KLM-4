import {Employee} from './Employee';
import {Functions} from './Functions';

/**
 * This class is a Modal for the runners
 */
export class Runner extends Employee {
  constructor(name: string, lastname: string) {
    super(name, lastname, Functions.RUNNER);
  }

  getRole(): string {
    return super.getRole();
  }
}
