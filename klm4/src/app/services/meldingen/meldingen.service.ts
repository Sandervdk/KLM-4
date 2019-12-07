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
    //   PlaneTypes.AirbusA330, WagonTypes.TIRECART, 'Rechts', RequestStatus.Pending));
    // this.mechanicMeldingen.push(new Melding(1, 'E9', new Date(), PlaneTypes.BOEING737, WagonTypes.SKYDROLWAGEN, 'Links', RequestStatus.Pending));
    // this.mechanicMeldingen.push(new Melding(1, 'A7',
    //   new Date(2019, 12, 0O5, 17, 23, 42, 1) ,
    //   PlaneTypes.AirbusA330, WagonTypes.NITROGENCART, 'Neus', RequestStatus.Pending));
    this.meldingen.push(new Melding(1, 'F3', new Date(), PlaneTypes.A330_200, WagonTypes.NITROGENCART, 'Rechts', RequestStatus.Pending));
    this.meldingen.push(new Melding(1, 'F3', new Date(), PlaneTypes.A330_300, WagonTypes.SKYDROLWAGEN, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(1, 'F3', new Date(), PlaneTypes.B737_700, WagonTypes.TIRECART, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(1, 'B2', new Date(), PlaneTypes.A330_200, WagonTypes.TIRECART, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(156, 'B2', new Date(), PlaneTypes.A330_200, WagonTypes.SKYDROLWAGEN, 'Rechts', RequestStatus.Delivered));
    this.meldingen.push(new Melding(156, 'C5', new Date(), PlaneTypes.B747_400F, WagonTypes.NITROGENCART, 'Rechts', RequestStatus.Pending));
    this.meldingen.push(new Melding(156, 'C5', new Date(), PlaneTypes.B737_800, WagonTypes.SKYDROLWAGEN, 'Rechts', RequestStatus.Pending));
    this.meldingen.push(new Melding(156, 'C5', new Date(), PlaneTypes.B737_700, WagonTypes.TIRECART, 'Rechts', RequestStatus.Collect));
    this.meldingen.push(new Melding(156, 'A7', new Date(), PlaneTypes.B777_300, WagonTypes.TIRECART, 'Rechts', RequestStatus.Accepted));
    this.meldingen.push(new Melding(156, 'A2', new Date(), PlaneTypes.B777_300, WagonTypes.TIRECART, 'Rechts', RequestStatus.Accepted));
  }

  public generateRandomId() {
    return Math.floor(Math.random() * 100 + 1);
  }

  public getAlleMeldingen() {
    return this.mechanicMeldingen;
  }

  public sortEnumsMostUsed(list: string[], enumType: PlaneTypes | WagonTypes) {
    let newList = [];
    if (enumType === PlaneTypes) {
      //Adds the first planetype to the newList, since it can't check for existing values if the newList is empty
      newList.push({type: this.meldingen[0].planetype, amount: 1});

      //loops through every request or a max of 50 requests, has the outer tag to be called by the inner loop
      outer: for (let i = 1; i < 50 && i < this.meldingen.length; i++) {
        /*
         * loops through every item in the new list, checks if the type is already in the list.
         * If the type is already in the list the number will be increased by 1 and continues outer loop,
         * otherwise it will set the amount to 1.
         */
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === this.meldingen[i].planetype) {
            newList[j].amount = newList[j].amount + 1;
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: this.meldingen[i].planetype, amount: 1});
          }
        }
      }

      //loops through every planetype to check if any of the planetypes are still missing from the list.
      outer: for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === list[i]) {
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: list[i], amount: 0});
          }
        }
      }
    } else if (enumType === WagonTypes) {
      //Adds the first planetype to the newList, since it can't check for existing values if the newList is empty
      newList.push({type: this.meldingen[0].wagonType, amount: 1});

      //loops through every request or a max of 50 requests, has the outer tag to be called by the inner loop
      outer: for (let i = 1; i < 50 && i < this.meldingen.length; i++) {
        /*
         * loops through every item in the new list, checks if the type is already in the list.
         * If the type is already in the list the number will be increased by 1 and continues outer loop,
         * otherwise it will set the amount to 1.
         */
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === this.meldingen[i].wagonType) {
            newList[j].amount = newList[j].amount + 1;
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: this.meldingen[i].wagonType, amount: 1});
          }
        }
      }

      //loops through every planetype to check if any of the planetypes are still missing from the list.
      outer: for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === list[i]) {
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: list[i], amount: 0});
          }
        }
      }
    }

    //Sorts the list based on the amount of times it has been used
    newList.sort((a , b) => b.amount - a.amount);
    // Checks if the lists are the same size (should always be correct), sets the list as the sorted list.
    if (newList.length === list.length) {
      for (let i = 0; i < list.length; i++) {
        list[i] = newList[i].type;
      }
    }

    console.log(newList);
    console.log(list);
  }


  public bezorgd(index: number) {
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
