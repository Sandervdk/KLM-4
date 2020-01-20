import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentRoute: String[];
  notLoginPage: boolean;

  /**
   * The constructor of the navbar component sibscribes to the URL to detect any changes, if the url changes and it
   * contains the login page in the URL it will disable the navbar since there aren't any available routes on the login page.
   * If it isn't on the login page it will create a custom array of string that keeps track of only the name elements
   * of the url without the dashes. These elements will be reformatted using the fixLink method
   *
   * @See #fixLink(string)
   *
   * @param router
   * @param route
   * @param authentication
   */
  constructor(private router: Router, private route: ActivatedRoute, private authentication: AuthenticationService) {
    this.router.events.subscribe(() => {
      //disables the navbar for the login screen
      this.notLoginPage = this.router.url !== '/signin';
      if (!this.notLoginPage) {
        return;
      }

      //initializes the array and stets the first dash index to 1 so it skips the dash at the start
      this.currentRoute = [];
      let lastDash: number = 0;
      let tempString: String;

      //loops through the url length, checking for every dash and adds a seperate item in the currenRoute array for
      //each string between two dashes. If the loop has reached the end, it will also add the last string to the array
      for (let i = 0; i < this.router.url.length; i++) {
        if (i == 0 && this.router.url.charAt(0) === '/') {
          lastDash = 1;
          continue;
        }
        if (this.router.url.charAt(i) === '/') {
          tempString = this.router.url.substring(lastDash, i);
          tempString = this.fixLink(tempString);
          this.currentRoute.push(tempString);
          lastDash = i + 1;
        } else if (i === this.router.url.length - 1) {
          tempString = this.router.url.substring(lastDash);
          tempString = this.fixLink(tempString);
          this.currentRoute.push(tempString);
        }
      }
    })
  }

  ngOnInit() {}

  /**
   * Reformats the routes to make sure the display names of said routes start with upper case and continue in lower
   * case letters.
   * @param string Text between two slashes in the URL
   */
  private fixLink(string: String): String {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
  }

  /**
   * Takes the index of the clicked link in the navbar and creates a valid routing string based on how deep the link is.
   * In the case where it takes either a second or deeper child routing element, it will have to add all previous parts
   * of the link to the new URL. This is done because it is possible to go back multiple layers in the routing.
   * @param index The location of how many dashes deep the URL is.
   */
  navigate(index: number) {
    let location = "";
    for (let i = 0; i <= index; i++) {
      location += "/" + this.currentRoute[i];
    }
    this.router.navigate([location.toLowerCase()]);
  }

  /**
   * Logout function that uses the authentication service to log the user out and reroutes the user to the signin page.
   */
  logOut() {
    this.authentication.signOut();
    this.router.navigate(['/signin']);
  }
}
