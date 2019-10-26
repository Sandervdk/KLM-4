import {Component, OnInit} from '@angular/core';
import {AdminRouteService} from '../admin-route.service';

@Component({
  selector: 'app-usersoverview',
  templateUrl: './usersoverview.component.html',
  styleUrls: ['./usersoverview.component.css']
})
export class UsersoverviewComponent implements OnInit {

  constructor(private adminRouter: AdminRouteService) {
  }

  ngOnInit() {
  }

}
