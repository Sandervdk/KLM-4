import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';

export class Melding {
  locatie: string;
  tijd: any;
  typeVliegtuig: PlaneTypes;
  wagonTypes: any;
  positie: any;


  constructor(locatie: string, tijd: any, typeVliegtuig: PlaneTypes, wagonTypes: any, positie: any) {
    this.locatie = locatie;
    this.tijd = tijd;
    this.typeVliegtuig = typeVliegtuig;
    this.wagonTypes = wagonTypes;
    this.positie = positie;
  }

}
