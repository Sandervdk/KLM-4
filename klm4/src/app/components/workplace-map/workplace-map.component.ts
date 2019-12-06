import {Component, OnInit} from '@angular/core';
import {latLng, tileLayer} from 'leaflet';
import {WagonsService} from '../../services/wagons/wagons.service';
import {MeldingenService} from '../../services/meldingen/meldingen.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

declare let L;

@Component({
  selector: 'app-workplace-map',
  templateUrl: './workplace-map.component.html',
  styleUrls: ['./workplace-map.component.css']
})
export class WorkplaceMapComponent implements OnInit {
  public map;
  public equipment;
  private long = 4.766361511202604;
  private lat = 52.30678841808895;

  constructor(private authService: AuthenticationService, private wagonServices: WagonsService, private meldingService: MeldingenService) {
    this.equipment = this.meldingService.getMeldingAtIndex(this.meldingService.index); // selected equipment from list
  }

  ngOnInit() {
    this.createMap();
  }

  private createMap() {
    this.map = L.map('map-container', {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Made by KLM-4 Of HVA'
        })
      ],
      zoom: 13,
      center: latLng(this.lat, this.long)// these are starting points when the map is initialized
    });

    this.setUpLayers();
  }

  private setUpLayers() {
    const layers = {
      [this.equipment.wagonType]: this.wagonServices.getFuelWagonsLayer()
    };

    const checkBoxes = L.control.layers(null, layers, {collapsed: false}).addTo(this.map);
    checkBoxes.getContainer().setAttribute('class', '');
    checkBoxes.checked = true;
    document.querySelector('#jpt .wagons-container .card-body').appendChild(checkBoxes.getContainer());
  }
}
