import {Injectable} from '@angular/core';
import {Functions} from '../../models/staff/Functions';
import {Admin} from '../../models/staff/Admin';
import {Mechanic} from '../../models/staff/Mechanic';
import {Runner} from '../../models/staff/Runner';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user;
  private username: string;

  /**
   * These are the static accounts that should be in the database
   */
  private staticAccounts = [
    {id: 57, username: 'runner@klm.nl', password: 'Welkom01', lastname: 'van de Kamp', role: Functions.RUNNER},
    {id: 156, username: 'mechanic@klm.nl', password: 'Welkom01', lastname: 'Edusei', role: Functions.MECHANIC},
    {id: 1, username: 'admin@klm.nl', password: 'Welkom01', lastname: 'Butt', role: Functions.ADMIN}
  ];

  /**
   * This constructor serves to check if the user is not empty,
   *  when the user is empty the application navigates to the signin page
   *
   * @param router this will navigate the application to the desired page
   * @param route this will check the current route
   */
  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.user == null) {
      this.router.navigate(['/signin'], {
        relativeTo: this.route
      });
    }
  }

  /**
   * This method will use the given username and password, check them in the database
   * and give access to the information of that user
   *
   * @param username the username of the signed in user
   * @param password  the password of the signed in user
   */
  public login(username: string, password: string): boolean {
    // TODO: Use the database connection to check the credentials in the database, when correct return true
    const container = this.staticAccounts;
    for (let i = 0; i < this.staticAccounts.length; i++) {
      if (container[i].username === username && container[i].password === password) {
        this.username = username;
        this.createUser(container[i]);
        return true;
      }
    }
    return false;
  }

  /**
   * This method creates an Employee based on the role that it has
   *
   * @param userDetails the details given from the database
   */
  private createUser(userDetails): void {
    switch (userDetails.role) {
      case Functions.ADMIN:
        this.user = new Admin(userDetails.username, userDetails.lastname);
        break;
      case Functions.MECHANIC:
        this.user = new Mechanic(userDetails.username, userDetails.lastname);
        break;
      case Functions.RUNNER:
        this.user = new Runner(userDetails.username, userDetails.lastname);
        break;
    }
  }

  /**
   * This method is meant for the admin to create new users
   *
   * @param username the email address of the new user
   * @param lastname the lastname of the new user
   * @param password the password of the new user
   */
  public createNewUser(username: string, lastname: string, password: string, role: Functions) {
    this.staticAccounts.push({id: (Math.round(Math.random() * 50)), username, password, lastname, role});
  }

  /**
   * This method returns the created user,
   * which can be used to check everything of in this application
   */
  public getUser() {
    return this.user;
  }

  public getAccounts() {
    return this.staticAccounts;
  }

  public signOut() {
    this.user = null;
  }
}
