import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteService {
  public hideNavButtons = false;

  constructor(private router: Router) {
  }

  /**
   * This method is meant to serve the user to a specific page when signed in as an Admin
   *
   * @param page the page that the user is linked to
   */
  public navigateTo(page: string) {
    if (page === 'admin') {
      this.hideNavButtons = false;
    } else {
      this.hideNavButtons = true;
    }
    this.router.navigate([`/${page}`]);
  }
}
