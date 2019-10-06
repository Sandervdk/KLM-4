import { Component, OnInit } from '@angular/core';
import { marker, tileLayer, latLng, Marker, icon } from 'leaflet';
declare let L;

@Component({
  selector: 'app-workplace-map',
  templateUrl: './workplace-map.component.html',
  styleUrls: ['./workplace-map.component.css']
})
export class WorkplaceMapComponent implements OnInit {
  public map;
  public long = 4.766361511202604;
  public lat = 52.30678841808895;
  public fuelWagonslayer;
  public fuelWagonMarkers: Marker[] = [];

  /**
   * Should be in a services, with al the wagons and equipment I think
   */
  public fuelWagons = [
    {
      id: 0,
      title: 'Fuel Wagon',
      lastSeen: {lat: (this.lat + 0.5555), long: (this.long)}
    },
    {
      id: 1,
      title: 'Fuel Wagon',
      lastSeen: {lat: (this.lat + 0.0556), long: (this.long)}
    },
    {
      id: 2,
      title: 'Fuel Wagon',
      lastSeen: {lat: (this.lat + 0.8586), long: (this.long)}
    },
    {
      id: 3,
      title: 'Fuel Wagon',
      lastSeen: {lat: (this.lat + 1.8586), long: (this.long)}
    },
    {
      id: 4,
      title: 'Fuel Wagon',
      lastSeen: {lat: (this.lat + 0.2255), long: (this.long + 2)}
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.locationsFuelWagons();

    this.map = L.map('map-container', {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Made by KLM-4 Of HVA'
        })
      ],
      zoom: 12,
      center: latLng(this.lat, this.long)
    });

    const checkBoxes = L.control.layers(null, {'Fuel Wagons': this.fuelWagonslayer}, {collapsed: false}).addTo(this.map);
    document.querySelector('#jpt').appendChild(checkBoxes.getContainer());
  }

  /**
   * Adding the locations of the wagons, fill the layer array with the markers
   */
  locationsFuelWagons() {
    // @ts-ignore
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.fuelWagons.length; i++) {
      const reference = this.fuelWagons[i];
      const lastSeenLocation = this.fuelWagons[i].lastSeen;

      this.fuelWagonMarkers.push(
        marker([lastSeenLocation.lat, lastSeenLocation.long], {
          icon: icon({
            iconSize: [30, 30],
            iconAnchor: [13, 5],
            iconUrl: 'https://66.media.tumblr.com/1d8d45e656056a721465abf9d30951ae/tumblr_okg3shhv7d1uryh6jo6_250.jpg',
            shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
          })
        }).bindPopup(`${reference.title} (${reference.id})`)
      );
    }

    this.fuelWagonslayer = L.layerGroup(this.fuelWagonMarkers);
  }
}
