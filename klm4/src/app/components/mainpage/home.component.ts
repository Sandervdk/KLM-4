import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  /**
   * Should have a better name, but will change in future
   */
  nextScreen() {
    console.log('klik')
    this.router.navigate(['/map'], {
      relativeTo: this.route
    });
  }

}
