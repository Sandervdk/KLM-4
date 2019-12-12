import {Component, OnInit} from '@angular/core';
import {latLng, LayerGroup, tileLayer} from 'leaflet';
import {WagonsService} from '../../services/wagons/wagons.service';
import {MeldingenService} from '../../services/meldingen/meldingen.service';
import {Router} from '@angular/router';
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

  constructor(private wagonServices: WagonsService,
              private meldingService: MeldingenService,
              private authService: AuthenticationService) {
    this.equipment = this.meldingService.getMeldingen()[this.meldingService.index];
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
    let layers;
    switch (this.equipment.wagonType) {
      case WagonTypes.FUEL_CART:
        layers = {
          [WagonTypes.FUEL_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.NITROGENCART:
        layers = {
          [WagonTypes.NITROGENCART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.TIRECART:
        layers = {
          [WagonTypes.TIRECART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.SKYDROLWAGEN:
        layers = {
          [WagonTypes.SKYDROLWAGEN]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.BRAKES_CART:
        layers = {
          [WagonTypes.BRAKES_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.IDG_CART:
        layers = {
          [WagonTypes.IDG_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.SKYDROL_CART:
        layers = {
          [WagonTypes.SKYDROL_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.HYJET5:
        layers = {
          [WagonTypes.HYJET5]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.WORKING_LIFT_PLATFORM:
        layers = {
          [WagonTypes.WORKING_LIFT_PLATFORM]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.TECHNICAL_STAIRS:
        layers = {
          [WagonTypes.TECHNICAL_STAIRS]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.DRAIN_CART_FUEL:
        layers = {
          [WagonTypes.DRAIN_CART_FUEL]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.DRAIN_CART_SKYDROL:
        layers = {
          [WagonTypes.DRAIN_CART_SKYDROL]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.WORK_LIFT:
        layers = {
          [WagonTypes.WORK_LIFT]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.SKYDROL_HYDRAULIC_FUEL_CART:
        layers = {
          [WagonTypes.SKYDROL_HYDRAULIC_FUEL_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.HYJET5_HYDRAULIC_FLUID_CART:
        layers = {
          [WagonTypes.HYJET5_HYDRAULIC_FLUID_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.PUMP_STAIRS:
        layers = {
          [WagonTypes.PUMP_STAIRS]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.PYLON_STAIRS:
        layers = {
          [WagonTypes.PYLON_STAIRS]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.BRAKES_COOLER:
        layers = {
          [WagonTypes.BRAKES_COOLER]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.COOLING_CART:
        layers = {
          [WagonTypes.COOLING_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.PUMP_STAIRS:
        layers = {
          [WagonTypes.PUMP_STAIRS]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.POLAR_HEATER:
        layers = {
          [WagonTypes.POLAR_HEATER]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.HEATER:
        layers = {
          [WagonTypes.HEATER]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.AIR_DATA_CART:
        layers = {
          [WagonTypes.AIR_DATA_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.SPILL_CART:
        layers = {
          [WagonTypes.SPILL_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.HOIST_CART:
        layers = {
          [WagonTypes.HOIST_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.GREASE_CART:
        layers = {
          [WagonTypes.GREASE_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.CLEANING_CART:
        layers = {
          [WagonTypes.CLEANING_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.HEATER_POLAR_CART:
        layers = {
          [WagonTypes.HEATER_POLAR_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
      case WagonTypes.SPILL_KIT_CART:
        layers = {
          [WagonTypes.SPILL_KIT_CART]: this.wagonServices.getFuelWagonsLayer()
        };
        break;
    }

    const checkBoxes = L.control.layers(null, layers, {collapsed: false}).addTo(this.map);
    checkBoxes.getContainer().setAttribute('class', '');
    document.querySelector('#jpt .wagons-container .card-body').appendChild(checkBoxes.getContainer());
  }
}
