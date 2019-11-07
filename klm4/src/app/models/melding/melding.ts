import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {Time} from '@angular/common';

export class Melding {
  id: number;
  locatie: string;
  deadline: any;
  typeVliegtuig: PlaneTypes;
  wagonTypes: any;
  positie: any;
  tijd: any;


  constructor(id: number ,locatie: string, deadline: any, typeVliegtuig: PlaneTypes, wagonTypes: any, positie: any, tijd: any) {
    this.id = id;
    this.locatie = locatie;
    this.deadline = deadline;
    this.typeVliegtuig = typeVliegtuig;
    this.wagonTypes = wagonTypes;
    this.positie = positie;
    this.tijd = tijd;
  }

}
