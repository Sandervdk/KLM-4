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
    this.wagonServices.getCartsByType(this.equipment.wagonType).subscribe(wagons => {
      wagons.forEach(wagon => {
        this.wagonServices.createMarker(wagon);
      });
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
      zoom: 14,
      center: latLng(this.lat, this.long)// these are starting points when the map is initialized
    });

    this.setUpLayers();
  }

  /**
   * This method will create the layer of Cartmarkers and also show the checkbox of that layer
   */
  private setUpLayers() {
    const layers = this.wagonServices.getLayer(this.equipment.wagonType);
    const checkBoxes = L.control.layers(null, layers, {collapsed: false}).addTo(this.map);
    checkBoxes.getContainer().setAttribute('class', ''); // removed default style
    document.querySelector('#jpt .wagons-container .card-body').appendChild(checkBoxes.getContainer()); // move box from map to side
    document.querySelector('#jpt .leaflet-control-layers-toggle').remove(); // removes icon which blocked view
    this.initChooseCartBtn();
  }

  /**
   * This method will find the button to pick a Cart and set the status of that Cart
   */
  private initChooseCartBtn() {
    const chooseCartDiv = document.querySelector('.leaflet-pane.leaflet-marker-pane'); // div where the popup-text is hold
    chooseCartDiv.addEventListener('click', (popup) => { // after the marker is clicked the button will appear
      setTimeout(() => { // wait for the button to appear and set an eventListener
        // @ts-ignore
        const chooseCartBtn = popup.target.offsetParent.nextSibling.nextElementSibling
          .querySelector('.leaflet-zoom-animated button.btn-pick-cart'); // find the choose cart button
        try { // try catch for hiding errors in the frontend console
          chooseCartBtn.addEventListener('click', (data) => {
            const cartId = data.target.dataset.cartId; // get value of the id from the cartID attribute in HTML
            this.wagonServices.getCartByID(cartId).subscribe((springBootCart) => {
              const cart = this.wagonServices.createCart(springBootCart[0]); // create wagon of springBoot data
              this.wagonServices.changeCartStatus(cart, 'IN_USE'); // change the status of the wagon
              this.equipment.pickCart(cart); // will bind a cart to the Request
              this.resetMap();
            });
          });
        } catch (e) {
        }
      }, 500);
    });
  }

  private resetMap() {
    this.wagonServices.resetMarkers();
    this.map.remove();
    this.map = null;
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
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
