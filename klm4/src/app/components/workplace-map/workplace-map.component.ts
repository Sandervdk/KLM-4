import {Component, OnInit} from '@angular/core';
import {latLng, LayerGroup, tileLayer} from 'leaflet';
import {WagonsService} from '../../services/wagons.service';

declare let L;

@Component({
  selector: 'app-workplace-map',
  templateUrl: './workplace-map.component.html',
  styleUrls: ['./workplace-map.component.css']
})
export class WorkplaceMapComponent implements OnInit {
  public map;
  private long = 4.766361511202604;
  private lat = 52.30678841808895;

  private fuelWagonsLayer: LayerGroup;
  private test: LayerGroup;


  constructor(private wagonServices: WagonsService) {
    this.fuelWagonsLayer = wagonServices.getFuelWagonsLayer(); // layer with all the fuelwagon points
    this.test = wagonServices.getFuelWagonsLayer(); // TODO: this is a test and should be removed
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
      zoom: 12,
      center: latLng(this.lat, this.long)// these are starting points when the map is initialized
    });

    this.setUpLayers();
  }

  private setUpLayers() {
    const layers = {
      'Stikstof wagens': this.fuelWagonsLayer,
      'Dit is een test': this.test
    };

    const checkBoxes = L.control.layers(null, layers, {collapsed: false}).addTo(this.map);
    checkBoxes.getContainer().setAttribute('class', '');
    document.querySelector('#jpt .wagons-container .card-body').appendChild(checkBoxes.getContainer());
  }

}
