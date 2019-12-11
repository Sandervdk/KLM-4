import {Injectable, OnInit} from '@angular/core';
import {Melding} from '../../models/melding/melding';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {RequestStatus} from '../../models/enums/requestStatus';
import {Boeing737800_TailTypes} from "../../models/enums/tailTypeEnums/Boeing_737_800-TailTypes";

@Injectable({
  providedIn: 'root'
})
export class MeldingenService implements OnInit {
  private meldingen: Melding[] = [];                               //
  private mechanicMeldingen: Melding[] = [];                  // Array van meldingen voor de actieve mechanic
  private readonly URL: string = 'http://localhost:8080';
  public time = new Date().toLocaleTimeString();
  public index: number = 0;

  constructor(private httpClient: HttpClient, private router: Router, private authentication: AuthenticationService) {

    this.randomMeldingen();
    for(let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id === authentication.getID()) {
        this.mechanicMeldingen.push(this.meldingen[i]);
      }
    }
  }

  ngOnInit() {
  }

  public getAllMeldingenFromSpring(): Observable<Melding[]> {
    return this.httpClient.get<Melding[]>(this.URL + '/openstaande-meldingen');

  }

  public randomMeldingen() {
    // this.mechanicMeldingen.push(new Melding(1, 'F5',
    //   new Date(2019, 01, 0O5, 17, 23, 42, 1) ,
    //   PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', RequestStatus.Pending));
    // this.mechanicMeldingen.push(new Melding(1, 'E9', new Date(), PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'Links', RequestStatus.Pending));
    // this.mechanicMeldingen.push(new Melding(1, 'A7',
    //   new Date(2019, 12, 0O5, 17, 23, 42, 1) ,
    //   PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Neus', RequestStatus.Pending));
    this.meldingen.push(new Melding(1001, 'F3', new Date(), new Date(),  PlaneTypes.BOEING737700, Boeing737800_TailTypes.PH_BCD, WagonTypes.STIKSTOFWAGEN, null,  'Right', RequestStatus.Pending, null));
    this.meldingen.push(new Melding(1001, 'F3', new Date(), new Date(),  PlaneTypes.BOEING737700, Boeing737800_TailTypes.PH_BXB, WagonTypes.BANDENWAGEN, null,  'Left', RequestStatus.Collect, "n:1, m:0"));
    this.meldingen.push(new Melding(1001, 'F3', new Date(), new Date(),  PlaneTypes.BOEING737700, Boeing737800_TailTypes.PH_BCD, WagonTypes.BRAKES_CART, null,  'Nose', RequestStatus.Delivered, null));
    this.meldingen.push(new Melding(1001, 'F3', new Date(), new Date(),  PlaneTypes.BOEING737700, Boeing737800_TailTypes.PH_BCB, WagonTypes.SKYDROLWAGEN, null,  'Right', RequestStatus.Pending, null));
  }

  public generateRandomId() {
    return Math.floor(Math.random() * 100 + 1);
  }

  public getAlleMeldingen() {
    return this.mechanicMeldingen;
  }


  public bezorgd(index: number) {
    console.log(this.index);
    if (confirm('Equipment is bezorgd?')) {
      this.meldingen[index].status = RequestStatus.Delivered;
      this.router.navigate(['/runner/open-requests']);
    }
  }

  public getMeldingen(): Melding[] {
    return this.meldingen;
  }

  public getMechanicMeldingen(): Melding[] {
    return this.mechanicMeldingen;
  }
}
