import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Wagon} from '../../models/wagons/Wagon.modal';
import {Observable} from 'rxjs';
import {icon, LayerGroup, Marker, marker} from 'leaflet';

declare let L; // used for Leaflet.js
@Injectable({
  providedIn: 'root'
})
export class WagonsService {
  private readonly URL = 'http://localhost:8080/carts'; // springboot url for the carts

  /**
   * all the markers for a specific cart
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

  /**
   * This constructor is responsible for making the layers for all the wagons used
   * to be shown on the map
   *
   * @param http used to make http calls
   */
  constructor(private http: HttpClient) {
  }

  initLayers() {
    this.getAllWagons().subscribe(wagons => {
      for (let i = 0; wagons.length; i++) {
        if (wagons[i] != null) {
          this.createLayer(wagons[i]);
        }
      }

      return true;
    });
  }

  // TODO: use http call to create new wagon

  /**
   * Returns the object with all the markers
   */
  public getMarkers() {
    return this.wagonMarkers;
  }

  /**
   * This method will
   * @param wagonType
   */
  public getWagonsByType(wagonType: string) {
    const springBootEnum = this.translateAppEnumToSpring(wagonType);
    return this.http.get<Wagon[]>(`${this.URL}/?type=${springBootEnum}`);
  }

  /**
   * This method will return observable with all the wagons from the database
   */
  public getAllWagons(): Observable<Wagon[]> {
    return this.http.get<Wagon[]>(this.URL);
  }

  private createLayer(wagon) {
    const createdWagon = new Wagon(
      wagon.id,
      wagon.title,
      wagon.lat,
      wagon.lng,
      wagon.carttype,
      wagon.equipmentStatus
    );

    switch (wagon.carttype) {
      case 'FUEL_CART':
        this.wagonMarkers.FUEL_CART.push(
          marker([createdWagon.getLat(), createdWagon.getLng()], {
            icon: icon({
              iconSize: [30, 30],
              iconAnchor: [13, 5],
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.MAINTENANCE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
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
              iconUrl: Wagon.WAGON_ICONS.AVAILABLE
            })
          }).bindPopup(`${createdWagon.getTitle()} (${createdWagon.getID()})`)
        );
        break;
    }
  }

  /**
   * This method will translate and return the SpringBoot version of the given enum
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
