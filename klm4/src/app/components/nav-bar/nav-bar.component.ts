import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  mechanicMode = false;
  runnerMode = false

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  showRunner(){
    this.runnerMode = true;
    this.mechanicMode = false;
    this.router.navigate(['/meldingen-openstaand'], {
      relativeTo: this.route
    });
  }

  showMechanic(){
    this.mechanicMode = true;
    this.runnerMode = false;
    this.router.navigate(['/request-Form'], {
      relativeTo: this.route
    });
  }

  logOut() {
    this.mechanicMode = false;
    this.runnerMode = false;
  }
}
