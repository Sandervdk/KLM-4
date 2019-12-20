import {Component, OnInit} from '@angular/core';
import {latLng, tileLayer} from 'leaflet';
import {WagonsService} from '../../services/wagons/wagons.service';
import {MeldingenService} from '../../services/meldingen/meldingen.service';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {AuthenticationService} from '../../services/authentication/authentication.service';

declare let L;

@Component({
  selector: 'app-workplace-map',
  templateUrl: './workplace-map.component.html',
  styleUrls: ['./workplace-map.component.css']
})
export class WorkplaceMapComponent implements OnInit {
  public map;
  protected equipment;
  private long = 4.766361511202604;
  private lat = 52.30678841808895;
  public check = false;

  constructor(private wagonServices: WagonsService,
              private meldingService: MeldingenService,
              private authService: AuthenticationService) {
    this.equipment = this.meldingService.getMeldingen()[this.meldingService.index];
  }

  ngOnInit() {
    this.wagonServices.getWagonsByType(this.equipment.wagonType).subscribe(wagons => {
      console.log(wagons);
      this.createMap();
    });
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
    let layers;

    layers = {
      [WagonTypes.NITROGENCART]: L.layerGroup(this.wagonServices.getMarkers().NITROGENCART)
    };
    /* this.equipment.wagonType TODO: check which type of wagon is ask, and then show layer
    *                            and switch to show correct checkbox for the given marker*/
    // console.log('layer map: ', layers); this is just for testing
    const checkBoxes = L.control.layers(null, layers, {collapsed: false}).addTo(this.map);
    checkBoxes.getContainer().setAttribute('class', '');
    document.querySelector('#jpt .wagons-container .card-body').appendChild(checkBoxes.getContainer());
  }

  openPopUp() {
    this.check = true;
  }

  closePopUp() {
    this.check = false;
  }

  bezorgd(index: number) {
    this.check = false;
    this.meldingService.bezorgd(index);
  }
}
