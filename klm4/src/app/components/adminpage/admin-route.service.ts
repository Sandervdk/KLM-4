import {Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteService {
  private subscription: Subscription;
  public hideNavButtons = false;
  public currentRoute: string;

  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe((params: Params) => {
      if (params.url === '/admin') {
        this.hideNavButtons = false;
      } else if (params.url === '/signin') {
        console.error(params.url, 'YAAASSS');
      } else {
        this.hideNavButtons = true;
      }
      if (params.url) {
        this.currentRoute = params.url;
      }
    });
  }

  // /**
  // UNSUBSCRIBING BREAKS THE APPLICATION!!!!!
  //  * This method will unsubscribe the navigate method with the application
  //  */
  // private unsubscribe() {
  //   this.subscription.unsubscribe();
  // }
}
