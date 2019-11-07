import {Injectable, OnInit} from '@angular/core';
import {Melding} from '../../models/melding/melding';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';

@Injectable({
  providedIn: 'root'
})
export class MeldingenService implements OnInit {
  public mechanicMeldingen: Melding[] = [];
  public currentOffer: Melding;

  constructor() {
    this.randomMeldingen();
  }

  ngOnInit() {
  }

  public selectedOffer(selectedRow: number) {
    this.currentOffer = this.mechanicMeldingen[selectedRow];
  }

  public randomMeldingen() {
    console.log("Werk je?");
    this.mechanicMeldingen.push(new Melding('F5', '14:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'rechts'));
    this.mechanicMeldingen.push(new Melding('E9', '11:45', PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'links'));
    this.mechanicMeldingen.push(new Melding('A7', '13:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Neus'));
    this.mechanicMeldingen.push(new Melding('F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'rechts'));
    this.mechanicMeldingen.push(new Melding('F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'rechts'));
  }

}
