import {Employee} from './Employee';
import {Functions} from './Functions';

/**
 * This class is for the Admin,
 * The Admin has the functionality to access everything that other users are able to do
 */
export class Admin extends Employee {
  constructor(name: string, lastname: string) {
    super(name, lastname, Functions.ADMIN);
  }
}
