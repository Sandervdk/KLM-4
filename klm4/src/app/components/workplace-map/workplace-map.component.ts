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

  private layers;
  private fuelWagonsLayer: LayerGroup;

  constructor(private wagonServices: WagonsService) {
    this.fuelWagonsLayer = wagonServices.getFuelWagonsLayer(); // layer with all the fuelwagon points
  }

  ngOnInit() {
    this.map = L.map('map-container', {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Made by KLM-4 Of HVA'
        })
      ],
      zoom: 12,
      center: latLng(this.lat, this.long)
    });

    this.layers = {
      'Stikstof wagens': this.fuelWagonsLayer,
      // 'Doet het': this.fuelWagonMarkers2Layer
    };
    const checkBoxes = L.control.layers(null, this.layers, {collapsed: false}).addTo(this.map);
    // checkBoxes.getContainer().setAttribute('class', '');
    document.querySelector('#jpt').appendChild(checkBoxes.getContainer());
  }

}
