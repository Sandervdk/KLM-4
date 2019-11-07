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
  status: meldingStatus;


  constructor(id: number, locatie: string, deadline: any, typeVliegtuig: PlaneTypes, wagonTypes: any, positie: any, tijd: any, status: meldingStatus) {
    this.id = id;
    this.locatie = locatie;
    this.deadline = deadline;
    this.typeVliegtuig = typeVliegtuig;
    this.wagonTypes = wagonTypes;
    this.positie = positie;
    this.tijd = tijd;
    this.status = status;
  }
}

export enum meldingStatus {
  Afzetten = 'Afzetten',
  Geaccepteerd = 'Geaccepteerd',
  Bezorgd = 'Bezorgd',
  Ophalen = 'Ophalen',
  Afgerond = 'Afgerond'
}
