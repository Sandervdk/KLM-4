import {Component, OnInit, PipeTransform} from '@angular/core';
import {AdminRouteService} from '../admin-route.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-usersoverview',
  templateUrl: './usersoverview.component.html',
  styleUrls: ['./usersoverview.component.css']
})

export class UsersoverviewComponent implements OnInit {
  public userSearch: string;

  constructor(private adminRouter: AdminRouteService, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
