import {Injectable, OnInit} from '@angular/core';
import {Melding} from '../../models/melding/melding';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {RequestStatus} from '../../models/enums/requestStatus';
import {TailType} from '../../models/enums/tailTypeEnums/TailTypes';

@Injectable({
  providedIn: 'root'
})
export class MeldingenService implements OnInit {
  private alleMeldingen: Melding[] = [];                      //
  private meldingen: Melding[] = [];
  private mechanicMeldingen: Melding[] = [];                  // Array van meldingen voor de actieve mechanic
  private readonly URL: string = 'http://localhost:8080';
  public time = new Date().toLocaleTimeString();
  public index: number = 0;
  public pendingTextCheck = true;
  public collectTextCheck = true;
  public deliveredTextCheck = true;
  public counter = 0;
  public counter2 = 0;
  public counter3 = 0;

  constructor(private httpClient: HttpClient, private router: Router, private authentication: AuthenticationService) {
    this.randomMeldingen();
    this.alleMeldingen = this.meldingen;


    // todo Don't uncomment plz
    // this.getAllMeldingenFromSpring().subscribe((requests) => {
    //   this.alleMeldingen = requests;
    //   //loops through every request that has been made
    //   for (let i = 0; i < this.alleMeldingen.length; i++) {
    //
    //     //checks for any request that has been made on the current date, adds the requests to the meldingen list
    //     if (this.alleMeldingen[i].deadline.getDate() == new Date().getDate()) {
    //       this.meldingen.push(this.alleMeldingen[i]);
    //
    //       // checks if the request are made by the currently logged in employee
    //       if (this.alleMeldingen[i].id === authentication.getID()) {
    //         this.mechanicMeldingen.push(this.meldingen[i]);
    //       }
    //     }
    //   }
    //   this.sortAllRequests();
    // })
  }

  checkPendingStatus() {
    if (this.authentication.getUser().getRole() == 'RUNNER') {
      for (let i = 0; i < this.meldingen.length; i++) {
        if (this.meldingen[i].status == RequestStatus.Pending) {
          this.counter++
        }
      }
      if (this.counter > 0) {
        this.counter = 0;
        this.pendingTextCheck = true;
      } else this.pendingTextCheck = false;
    } else {
      for (let i = 0; i < this.mechanicMeldingen.length; i++) {
        if (this.mechanicMeldingen[i].status == RequestStatus.Pending) {
          this.counter++
        }
      }
      if (this.counter > 0) {
        this.counter = 0;
        this.pendingTextCheck = true;
      } else this.pendingTextCheck = false;
    }
  }

  checkCollectStatus() {
      for (let i = 0; i < this.meldingen.length; i++) {
        if (this.meldingen[i].status == RequestStatus.Collect) {
          this.counter2++
        }
      }
      if (this.counter2 > 0) {
        this.counter2 = 0;
        this.collectTextCheck = true;
      } else this.collectTextCheck = false;
  }

  checkDeliveredStatus() {
    for (let i = 0; i < this.mechanicMeldingen.length; i++) {
      if (this.mechanicMeldingen[i].status == RequestStatus.Delivered) {
        this.counter3++
      }
    }
    if (this.counter3 > 0) {
      this.counter3 = 0;
      this.deliveredTextCheck = true;
    } else this.deliveredTextCheck = false;
  }

  ngOnInit() {
  }

  public getAllMeldingenFromSpring(): Observable<Melding[]> {
    return this.httpClient.get<Melding[]>(this.URL + '/openstaande-meldingen');

  }

  public randomMeldingen() {
    this.meldingen.push(new Melding(1001, 'F3', new Date(), new Date(), PlaneTypes.BOEING737700, TailType.PH_BCD, WagonTypes.NITROGENCART, null, 'Right', RequestStatus.Pending, null));
    this.meldingen.push(new Melding(1001, 'F4', new Date(), new Date(), PlaneTypes.BOEING737700, TailType.PH_BXB, WagonTypes.TIRECART, null, 'Left', RequestStatus.Collect, 'n:1, m:0'));
    this.meldingen.push(new Melding(1001, 'F5', new Date(), new Date(), PlaneTypes.BOEING737700, TailType.PH_BCD, WagonTypes.BRAKES_CART, null, 'Nose', RequestStatus.Delivered, null));
    this.meldingen.push(new Melding(1001, 'F6', new Date(), new Date(), PlaneTypes.BOEING737700, TailType.PH_BCB, WagonTypes.SKYDROLWAGEN, null, 'Right', RequestStatus.Pending, null));
    this.sortAllRequests();
  }

  // Sorts both the general requests and the mechanic requests from earliest to latest by deadline
  public sortAllRequests() {
    this.meldingen = this.meldingen.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline) {
        return 1;
      } else {
        return 0;
      }
    });

    this.mechanicMeldingen = this.mechanicMeldingen.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  public sortRequestsByDate(requests: Melding[]) {
    requests = requests.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return -1;
      } else if (a.deadline > b.deadline) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  public generateRandomId() {
    return Math.floor(Math.random() * 100 + 1);
  }

  public getAlleMeldingen() {
    return this.mechanicMeldingen;
  }


  public bezorgd(index: number) {
      this.meldingen[index].status = RequestStatus.Delivered;
      this.checkDeliveredStatus();
      this.router.navigate(['/runner/open-requests']);
  }

  public getMeldingen(): Melding[] {
    return this.meldingen;
  }

  public getMechanicMeldingen(): Melding[] {
    return this.mechanicMeldingen;
  }

  public sortEnumsMostUsed(list: string[], enumType: PlaneTypes.VLIEGTUIGTYPE | WagonTypes.EQUIPMENT) {
    let newList = [];
    if (enumType === PlaneTypes.VLIEGTUIGTYPE) {
      //Adds the first planetype to the newList, since it can't check for existing values if the newList is empty
      newList.push({type: this.alleMeldingen[0].planetype, amount: 1});

      //loops through every request or a max of 50 requests, has the outer tag to be called by the inner loop
      outer: for (let i = 1; i < 50 && i < this.alleMeldingen.length; i++) {
        /*
         * loops through every item in the new list, checks if the type is already in the list.
         * If the type is already in the list the number will be increased by 1 and continues outer loop,
         * otherwise it will set the amount to 1.
         */
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === this.alleMeldingen[i].planetype) {
            newList[j].amount = newList[j].amount + 1;
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: this.alleMeldingen[i].planetype, amount: 1});
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
    } else if (enumType === WagonTypes.EQUIPMENT) {
      //Adds the first planetype to the newList, since it can't check for existing values if the newList is empty
      newList.push({type: this.alleMeldingen[0].wagonType, amount: 1});

      //loops through every request or a max of 50 requests, has the outer tag to be called by the inner loop
      outer: for (let i = 1; i < 50 && i < this.alleMeldingen.length; i++) {
        /*
         * loops through every item in the new list, checks if the type is already in the list.
         * If the type is already in the list the number will be increased by 1 and continues outer loop,
         * otherwise it will set the amount to 1.
         */
        for (let j = 0; j < newList.length; j++) {
          if (newList[j].type === this.alleMeldingen[i].wagonType) {
            newList[j].amount = newList[j].amount + 1;
            continue outer;
          } else if (j === newList.length - 1) {
            newList.push({type: this.alleMeldingen[i].wagonType, amount: 1});
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
    newList.sort((a, b) => b.amount - a.amount);
    // Checks if the lists are the same size (should always be correct), sets the list as the sorted list.
    if (newList.length === list.length) {
      for (let i = 0; i < list.length; i++) {
        list[i] = newList[i].type;
      }
    }
  }

}
