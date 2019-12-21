import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart} from '../../models/carts/Cart.model';
import {Observable} from 'rxjs';
import {icon, marker} from 'leaflet';

declare let L; // used for Leaflet.js
@Injectable({
  providedIn: 'root'
})
export class WagonsService {
  private readonly URL = 'http://localhost:8080/carts'; // springboot url for the carts

  /**
   * Will hold all the markers for a specific cart
   */
  private wagonMarkers = {
    EQUIPMENT: [] = [],
    TIRECART: [] = [],
    NITROGENCART: [] = [],
    SKYDROLWAGEN: [] = [],
    BRAKES_CART: [] = [],
    IDG_CART: [] = [],
    SKYDROL_CART: [] = [],
    HYJET5: [] = [],
    HEATER_POLAR_CART: [] = [],
    FUEL_CART: [] = [],
    WORKING_LIFT_PLATFORM: [] = [],
    TECHNICAL_STAIRS: [] = [],
    DRAIN_CART_FUEL: [] = [],
    DRAIN_CART_SKYDROL: [] = [],
    WORK_LIFT: [] = [],
    SKYDROL_HYDRAULIC_FUEL_CART: [] = [],
    HYJET5_HYDRAULIC_FLUID_CART: [] = [],
    PUMP_STAIRS: [] = [],
    PYLON_STAIRS: [] = [],
    BRAKES_COOLER: [] = [],
    COOLING_CART: [] = [],
    POLAR_HEATER: [] = [],
    HEATER: [] = [],
    AIR_DATA_CART: [] = [],
    SPILL_CART: [] = [],
    HOIST_CART: [] = [],
    GREASE_CART: [] = [],
    CLEANING_CART: [] = [],
    SPILL_KIT_CART: [] = []
  };

  constructor(private http: HttpClient) {
  }

  // TODO: use http call to create new wagon

  /**
   * This method will return a layer of markers of the carts
   *
   * @param cartAppName string value of frontend enum
   */
  public getLayer(cartAppName) {
    const cartName = this.translateAppEnumToSpring(cartAppName); // translate the app enum to spring
    return {[cartAppName]: L.layerGroup(this.wagonMarkers[cartName])}; // return object with name and value of the layers
  }

  /**
   * This method will find a specific type of cart out of all the carts
   *
   * @param cartType the type of wagon, based on Cart
   */
  public getCartsByType(cartType: string) {
    const springBootEnum = this.translateAppEnumToSpring(cartType);
    return this.http.get<Cart[]>(`${this.URL}/?type=${springBootEnum}`);
  }

  /**
   * This method will return observable with all the carts from the database
   */
  public getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.URL);
  }

  public createLayer(cart) {
    const createdWagon = new Cart(
      cart.id,
      cart.title,
      cart.lat,
      cart.lng,
      cart.carttype,
      cart.equipmentStatus
    );

    switch (cart.carttype) {
      case 'FUEL_CART':
        this.wagonMarkers.FUEL_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'NITROGENCART':
        this.wagonMarkers.NITROGENCART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'TIRECART':
        this.wagonMarkers.TIRECART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'SKYDROLWAGEN':
        this.wagonMarkers.SKYDROLWAGEN.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'BRAKES_CART':
        this.wagonMarkers.BRAKES_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'IDG_CART':
        this.wagonMarkers.IDG_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'SKYDROL_CART':
        this.wagonMarkers.SKYDROL_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'HYJET5':
        this.wagonMarkers.HYJET5.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'WORKING_LIFT_PLATFORM':
        this.wagonMarkers.WORKING_LIFT_PLATFORM.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'TECHNICAL_STAIRS':
        this.wagonMarkers.TECHNICAL_STAIRS.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'DRAIN_CART_FUEL':
        this.wagonMarkers.DRAIN_CART_FUEL.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'DRAIN_CART_SKYDROL':
        this.wagonMarkers.DRAIN_CART_SKYDROL.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'WORK_LIFT':
        this.wagonMarkers.WORK_LIFT.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'SKYDROL_HYDRAULIC_FUEL_CART':
        this.wagonMarkers.SKYDROL_HYDRAULIC_FUEL_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'HYJET5_HYDRAULIC_FLUID_CART':
        this.wagonMarkers.HYJET5_HYDRAULIC_FLUID_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'PUMP_STAIRS':
        this.wagonMarkers.PUMP_STAIRS.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'PYLON_STAIRS':
        this.wagonMarkers.PYLON_STAIRS.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'BRAKES_COOLER':
        this.wagonMarkers.BRAKES_COOLER.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'COOLING_CART':
        this.wagonMarkers.COOLING_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'POLAR_HEATER':
        this.wagonMarkers.POLAR_HEATER.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'HEATER':
        this.wagonMarkers.HEATER.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'AIR_DATA_CART':
        this.wagonMarkers.AIR_DATA_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'SPILL_CART':
        this.wagonMarkers.SPILL_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'HOIST_CART':
        this.wagonMarkers.HOIST_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'GREASE_CART':
        this.wagonMarkers.GREASE_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'CLEANING_CART':
        this.wagonMarkers.CLEANING_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'HEATER_POLAR_CART':
        this.wagonMarkers.HEATER_POLAR_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
      case 'SPILL_KIT_CART':
        this.wagonMarkers.SPILL_KIT_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Cart.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
    }
  }

  /**
   * This method will translate the Angular enum and return the SpringBoot enum
   *
   * @param type used type enum in the application
   */
  private translateAppEnumToSpring(type) {
    let translated;
    switch (type) {
      case 'Equipment':
        translated = 'EQUIPMENT';
        break;
      case 'Tires Cart':
        translated = 'TIRECART';
        break;
      case 'Nitrogen Cart':
        translated = 'NITROGENCART';
        break;
      case 'Skydrolwagen':
        translated = 'SKYDROLWAGEN';
        break;
      case 'Brakes Cart':
        translated = 'BRAKES_CART';
        break;
      case 'IDG Cart':
        translated = 'IDG_CART';
        break;
      case 'Skydrol':
        translated = 'SKYDROL_CART';
        break;
      case 'Hyjet5':
        translated = 'HYJET5';
        break;
      case 'Heater, Polar Cart':
        translated = 'HEATER_POLAR_CART';
        break;
      case 'Fuel Cart':
        translated = 'FUEL_CART';
        break;
      case 'Working Lift Platform':
        translated = 'WORKING_LIFT_PLATFORM';
        break;
      case 'Technical stairs':
        translated = 'TECHNICAL_STAIRS';
        break;
      case 'Work Lift':
        translated = 'WORK_LIFT';
        break;
      case 'yjet5 hydraulic fuel cart':
        translated = 'HYJET5_HYDRAULIC_FLUID_CART';
        break;
      case 'Pump Stairs':
        translated = 'PUMP_STAIRS';
        break;
      case 'Pylon Stairs':
        translated = 'PYLON_STAIRS';
        break;
      case 'Brakes Cooler':
        translated = 'BRAKES_COOLER';
        break;
      case 'Cooling Cart':
        translated = 'COOLING_CART';
        break;
      case 'Polar Heater':
        translated = 'POLAR_HEATER';
        break;
      case 'Heater':
        translated = 'HEATER';
        break;
      case 'Air Data Cart':
        translated = 'AIR_DATA_CART';
        break;
      case 'Spill Cart':
        translated = 'SPILL_CART';
        break;
      case 'Hoist Cart':
        translated = 'HOIST_CART';
        break;
      case 'Grease Cart':
        translated = 'GREASE_CART';
        break;
      case 'Cleaning Cart':
        translated = 'CLEANING_CART';
        break;
      case 'Spill Kit Cart':
        translated = 'SPILL_CART';
        break;
    }

    return translated;
  }
}
