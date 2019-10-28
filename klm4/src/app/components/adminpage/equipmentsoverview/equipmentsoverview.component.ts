import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {WagonsService} from '../../../services/wagons/wagons.service';

@Component({
  selector: 'app-equipmentsoverview',
  templateUrl: './equipmentsoverview.component.html',
  styleUrls: ['./equipmentsoverview.component.css']
})
export class EquipmentsoverviewComponent implements OnInit {
  public equipmentSearch: string;

  constructor(private wagonsService: WagonsService) {
  }

  ngOnInit() {
  }

}
