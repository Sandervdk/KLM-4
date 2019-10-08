import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  /**
   * Should have a better name, but will change in future
   */
  nextScreen() {
    this.router.navigate(['/map'], {
      relativeTo: this.route
    });
  }
}
