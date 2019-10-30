import {Injectable} from '@angular/core';
import {Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private subscription: Subscription;
  public hideNavButtons = false;
  public currentRoute: string;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.subscription = this.router.events.subscribe((params: Params) => {
      if (params.url === '/admin') { // hide main buttons to load the router-outlet content
        this.hideNavButtons = false;
      } else {
        this.hideNavButtons = true;
      }

      if (params.url) { // check if url is not undefined
        this.currentRoute = `${params.url}`; // convert url to string
      }
    });
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

  // /**
  // UNSUBSCRIBING BREAKS THE APPLICATION!!!!!
  //  * This method will unsubscribe the navigate method with the application
  //  */
  // private unsubscribe() {
  //   this.subscription.unsubscribe();
  // }
}
