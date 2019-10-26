import {Component, OnInit} from '@angular/core';
import {AdminRouteService} from './admin-route.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private adminRouter: AdminRouteService) {
  }

  ngOnInit() {
  }
}
