import {Injectable, OnInit} from '@angular/core';
import {Melding, meldingStatus} from '../../models/melding/melding';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MeldingenService implements OnInit {
  public mechanicMeldingen: Melding[] = [];
  private readonly URL: string = 'http://localhost:8080';
  public time = new Date().toLocaleTimeString();
  public index: number = 0;

  constructor(private httpClient: HttpClient, private router: Router) {

    this.randomMeldingen();
  }

  ngOnInit() {
  }

  public getAllMeldingen(): Observable<Melding[]> {
    return this.httpClient.get<Melding[]>(this.URL + '/openstaande-meldingen')
  }



  public randomMeldingen() {
    this.mechanicMeldingen.push(new Melding(1, 'F5', '14:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(1, 'E9', '11:45', PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'Links', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(1, 'A7', '13:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Neus', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(1, 'F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.STIKSTOFWAGEN, 'Rechts', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(1, 'F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.SKYDROLWAGEN, 'Rechts', this.time, meldingStatus.Bezorgd));
    this.mechanicMeldingen.push(new Melding(1, 'F3', '09:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Ophalen));
    this.mechanicMeldingen.push(new Melding(1, 'B2', '11:11', PlaneTypes.Ambraer190, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Bezorgd));
    this.mechanicMeldingen.push(new Melding(156, 'B2', '11:11', PlaneTypes.Ambraer190, WagonTypes.SKYDROLWAGEN, 'Rechts', this.time, meldingStatus.Bezorgd));
    this.mechanicMeldingen.push(new Melding(156, 'C5', '13:40', PlaneTypes.BOEING737, WagonTypes.STIKSTOFWAGEN, 'Rechts', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(156, 'C5', '13:40', PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'Rechts', this.time, meldingStatus.Afzetten));
    this.mechanicMeldingen.push(new Melding(156, 'C5', '13:40', PlaneTypes.BOEING737, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Ophalen));
    this.mechanicMeldingen.push(new Melding(156, 'A7', '14:45', PlaneTypes.AirbusA330, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Geaccepteerd));
    this.mechanicMeldingen.push(new Melding(156, 'A2', '12:30', PlaneTypes.Ambraer190, WagonTypes.BANDENWAGEN, 'Rechts', this.time, meldingStatus.Geaccepteerd));
    this.sortMeldingen();
  }

  public generateRandomId() {
    return Math.floor(Math.random() * 100 + 1);
  }

  public getAlleMeldingen() {
    return this.mechanicMeldingen;
  }

  public sortMeldingen() {
    this.mechanicMeldingen.sort((request1, request2) => {
      if (request1.tijd < request2.tijd) {
        return -1;
      } else if (request1.tijd > request2.tijd) {
        return 1;
      } else {
        return 1;
      }
    });
  }

  public bezorgd(index: number) {
    console.log(this.index);
    if (confirm('Equipment is bezorgd?')) {
      this.mechanicMeldingen[index].status = meldingStatus.Bezorgd;
       this.router.navigate(['/runner/meldingen-openstaand']);
    }
  }

}
