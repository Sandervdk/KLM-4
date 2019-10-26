import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Functions} from '../../models/staff/Functions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  mechanicMode = false;
  runnerMode = false;
  adminMode = false;

  constructor(private router: Router, private route: ActivatedRoute, private authentication: AuthenticationService) {
  }

  ngOnInit() {
    if (this.authentication.getUser().getRole() === Functions.RUNNER) {
      this.showRunner();
    } else if (this.authentication.getUser().getRole() === Functions.MECHANIC) {
      this.showMechanic();
    } else if (this.authentication.getUser().getRole() === Functions.ADMIN) {
      this.showAdmin();
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
    this.router.navigate(['/meldingen-openstaand'], {
      relativeTo: this.route
    });
  }

  showMechanic() {
    this.mechanicMode = true;
    this.runnerMode = false;
    this.router.navigate(['/request-Form'], {
      relativeTo: this.route
    });
  }

  logOut() {
    this.mechanicMode = false;
    this.runnerMode = false;
    this.authentication.signOut();
  }
}
