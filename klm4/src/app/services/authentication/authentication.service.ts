import {Injectable} from '@angular/core';
import {Functions} from '../../models/staff/Functions';
import {Admin} from '../../models/staff/Admin';
import {Mechanic} from '../../models/staff/Mechanic';
import {Runner} from '../../models/staff/Runner';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users;
  private user;
  private username: string;
  mechanicMode = false;
  runnerMode = false;
  adminMode = false;

  /**
   * This constructor serves to check if the user is not empty,
   *  when the user is empty the application navigates to the signin page
   *
   * @param router this will navigate the application to the desired page
   * @param route this will check the current route
   */
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    if (this.user == null) {
      this.router.navigate(['/signin'], {
        relativeTo: this.route
      });
    }
    userService.getAllUsers();
  }

  /**
   * This method will use the given username and password, check them in the database
   * and give access to the information of that user
   *
   * @param username the username of the signed in user
   * @param password  the password of the signed in user
   */
  public login(username: string, password: string): boolean {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === username && this.users[i].password === password) {
          this.username = username;
          this.createUser(this.users[i]);

          const userRole = this.getUser().getRole();
          if (userRole === Functions.RUNNER) {
            this.showRunner();
          } else if (userRole === Functions.MECHANIC) {
            this.showMechanic();
          } else if (userRole === Functions.ADMIN) {
            this.showAdmin();
          }

          return true;
        }
      }

      this.users = null;
    });

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
        this.user = new Admin(userDetails.firstname, userDetails.lastname,
          userDetails.email, userDetails.password);
        break;
      case Functions.MECHANIC:
        this.user = new Mechanic(userDetails.firstname, userDetails.lastname,
          userDetails.email, userDetails.password);
        break;
      case Functions.RUNNER:
        this.user = new Runner(userDetails.firstname, userDetails.lastname,
          userDetails.email, userDetails.password);
        break;
    }
  }

  showAdmin() {
    this.adminMode = true;
    this.runnerMode = false;
    this.mechanicMode = false;
    this.router.navigate(['/admin'], {
      relativeTo: this.route
    });
  }

  showRunner() {
    this.runnerMode = true;
    this.mechanicMode = false;
    this.router.navigate(['/runner'], {
      relativeTo: this.route
    });
  }

  showMechanic() {
    this.mechanicMode = true;
    this.runnerMode = false;
    this.router.navigate(['/mechanic'], {
      relativeTo: this.route
    });
  }

  /**
   * This method returns the created user,
   * which can be used to check everything of in this application
   */
  public getUser() {
    return this.user;
  }

  public getID() {
    return this.user.getId();
  }

  public signOut() {
    this.user = null;
  }
}
