import {Injectable, OnInit} from '@angular/core';
import {Melding} from '../../models/melding/melding';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {RequestStatus} from '../../models/enums/requestStatus';

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
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id === authentication.getID()) {
        this.mechanicMeldingen.push(this.meldingen[i]);
      }
    }
  }

  ngOnInit() {
  }

  public getAllMeldingen(): Observable<Melding[]> {
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
    this.meldingen.push(new Melding(1, 'F3', new Date(), PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Rechts', RequestStatus.Pending));
    this.meldingen.push(new Melding(1, 'F3', new Date(), PlaneTypes.AirbusA330, WagonTypes.SKYDROLWAGEN, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(1, 'F3', new Date(), PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(1, 'B2', new Date(), PlaneTypes.Ambraer190, WagonTypes.BANDENWAGEN, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(156, 'B2', new Date(), PlaneTypes.Ambraer190, WagonTypes.SKYDROLWAGEN, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(156, 'C5', new Date(), PlaneTypes.BOEING737, WagonTypes.STIKSTOFWAGEN, 'Rechts', RequestStatus.Pending));
    this.meldingen.push(new Melding(156, 'C5', new Date(), PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'Rechts', RequestStatus.Pending));
    this.meldingen.push(new Melding(156, 'C5', new Date(), PlaneTypes.BOEING737, WagonTypes.BANDENWAGEN, 'Rechts', RequestStatus.Collect));
    this.meldingen.push(new Melding(156, 'A7', new Date(), PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', RequestStatus.Accepted));
    this.meldingen.push(new Melding(156, 'A2', new Date(), PlaneTypes.Ambraer190, WagonTypes.BANDENWAGEN, 'Rechts', RequestStatus.Accepted));
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
      this.mechanicMeldingen[index].status = RequestStatus.Delivered;
      this.router.navigate(['/runner/meldingen-openstaand']);
    }
  }

  public getMeldingen(): Melding[] {
    return this.meldingen;
  }

  public getMeldingAtIndex(index: number) {
    return this.meldingen[index];
  }

  public getMechanicMeldingen(): Melding[] {
    return this.mechanicMeldingen;
  }
}
