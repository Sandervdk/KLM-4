import {Injectable, OnInit} from '@angular/core';
import {Melding, meldingStatus} from '../../models/melding/melding';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';

@Injectable({
  providedIn: 'root'
})
export class MeldingenService implements OnInit {
  public mechanicMeldingen: Melding[] = [];
  public time = new Date().toLocaleTimeString();

  constructor() {
    this.randomMeldingen();
  }

  ngOnInit() {
  }

  public randomMeldingen() {
    this.mechanicMeldingen.push(new Melding(this.generateRandomId(), 'F5', '14:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(this.generateRandomId(), 'E9', '11:45', PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'Links', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(this.generateRandomId(), 'A7', '13:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Neus', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(156, 'F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Rechts', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(156, 'F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Rechts', this.time, meldingStatus.Bezorgd));
    this.mechanicMeldingen.push(new Melding(156, 'F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Ophalen));
  }

  public generateRandomId() {
    return Math.floor(Math.random() * 100 + 1);
  }

  public getAlleMeldingen() {
    return this.mechanicMeldingen;
  }

}
