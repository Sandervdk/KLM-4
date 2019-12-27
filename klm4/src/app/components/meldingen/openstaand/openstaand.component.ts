import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeldingenService} from '../../../services/meldingen/meldingen.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Functions} from '../../../models/staff/Functions';
import {Melding} from '../../../models/melding/melding';
import {WagonTypes} from '../../../models/enums/wagonTypes';
import {DamagedFormComponent} from '../../damaged-form/damaged-form.component';
import {RequestStatus} from '../../../models/enums/requestStatus';
import {DomEvent} from "leaflet";
import {PlaneTypes} from "../../../models/enums/planeTypes";

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {
  private isLoaded = false;
  private meldingen: Melding[];
  private mechanicMeldingein: Melding[];
  private userRole: Functions;
  private expandedInfo: boolean[];
  private selectedRequest: Melding;
  private requestStatus = RequestStatus;
  private id: number;
  private numberOfButtons: number;
  private oldIndex: number;
  private equipmentIsBezorgd = false;
  private damageFormOpen = false;
  private towpopup = false;
  private equipmentlist = WagonTypes;
  private planetypeenums = PlaneTypes;
  public runnerAnimation = false;
  private currentTime;
  private comparingTime;      //Current time plus 30 minutes
  public click = false;
  public check = false;
  public number;
  public deliverChecker = false;
  private showform: boolean = false;
  private popupOpen: boolean = false;

  @ViewChild('damageForm', {static: false}) damageForm: DamagedFormComponent;

  constructor(private router: Router, private route: ActivatedRoute, private meldingService: MeldingenService,
              private authentication: AuthenticationService) {
    this.currentTime = new Date();
    this.comparingTime = new Date();
    this.comparingTime.setTime(this.currentTime.getTime() + (30 * 60 * 1000));
  }

  ngOnInit() {
    this.userRole = this.authentication.getUser().getRole();
    this.id = this.authentication.getID();
    this.checkIfLoaded();
  }

  private checkIfLoaded() {
    if (this.meldingService.isLoaded == true) {
      this.meldingen = this.meldingService.getMeldingen();
      this.mechanicMeldingein = this.meldingService.getMechanicMeldingen();
      this.isLoaded = true;
      this.meldingService.checkPendingStatus();
      this.meldingService.checkCollectStatus();
      this.meldingService.checkDeliveredStatus();
    } else {
      setTimeout(() => this.checkIfLoaded(), 500);
    }
  }

  /**
   * Should have a better name, but will change in future
   */
  nextScreen() {
    this.runnerAnimation = true;
    setTimeout(() => {
      this.runnerAnimation = false;
      this.router.navigate(['/runner/map'], {
        relativeTo: this.route
      });
    }, 1500);
  }

  // showPopUp(index: number) {
  //   if (confirm('Weet je zeker dat je de melding wilt accepteren?')) {
  //     if (this.meldingen[index].status === RequestStatus.Pending) {
  //       this.meldingen[index].status = RequestStatus.Accepted;
  //       this.meldingService.index = index;
  //       this.nextScreen();
  //     } else {
  //       this.meldingen[index].status = RequestStatus.Finished;
  //     }
  //     this.expandedInfo[index] = false;
  //     this.oldIndex = undefined;
  //   }
  // }

  // popUp(index: number) {
  //   if (confirm('Equipment is bezorgd?')) {
  //     this.meldingen[index].status = RequestStatus.Delivered;
  //     this.expandedInfo[index] = false;
  //     this.oldIndex = undefined;
  //   }
  // }
  //
  // ophaalPopUp(index: number) {
  //   if (confirm('Weet je zeker dat je klaar bent?')) {
  //     this.meldingen[index].status = RequestStatus.Collect;
  //   }
  // }
  //
  // deleteRequest(index: number) {
  //   this.mechanicMeldingein.splice(index, 1);
  //   this.expandedInfo[index] = false;
  // }

  // unfoldRow(index: number, subTable: Element) {
  //   // Disables the detailed dropdown list when the is a click on the close buttons in the sub table
  //   if (subTable === null || !subTable.classList.contains('clickableRow') && !subTable.classList.contains('extraInfoHeader')) {
  //     return;
  //   }
  //
  //   if (this.damageFormOpen) {
  //     this.damageFormOpen = this.damageForm.getShowForm();
  //   }
  //
  //   if (index === this.oldIndex) {
  //     this.expandedInfo[index] = !this.expandedInfo[index];
  //     this.oldIndex = undefined;
  //     return;
  //   }
  //
  //   this.numberOfButtons = 1;
  //   this.expandedInfo[index] = true;
  //   if (this.userRole === 'MECHANIC') {
  //     this.selectedRequest = this.mechanicMeldingein[index];
  //   } else {
  //     this.selectedRequest = this.meldingen[index];
  //   }
  //
  //   if (this.selectedRequest.status === RequestStatus.Delivered && this.userRole === 'MECHANIC') {
  //     this.numberOfButtons += 2;
  //     this.equipmentIsBezorgd = true;
  //   } else if (this.selectedRequest.status === RequestStatus.Accepted && this.userRole === 'RUNNER') {
  //     this.numberOfButtons += 2;
  //     this.equipmentIsBezorgd = true;
  //   }
  //
  //   this.expandedInfo[this.oldIndex] = false;
  //   this.oldIndex = index;
  // }

  openDamageForm() {
    this.damageFormOpen = true;
  }

  openPopUp(index: number) {
    this.click = true;
    this.setNumber(index)
  }

  closePopUp() {
    this.click = false;
  }

  setNumber(index: number) {
    this.number = index;
  }

  acceptMelding(index: number) {
    console.log(this.meldingen);
    console.log(index);
    this.meldingen[index].status = RequestStatus.Accepted;
    this.meldingService.index = index;
    this.click = false;
    this.meldingService.checkPendingStatus();
    this.meldingService.checkCollectStatus();
    this.nextScreen();
  }

  openPopUp2(index: number) {
    this.check = true;
    this.setNumber(index)
  }

  closePopUp2() {
    this.check = false;
  }

  deleteMelding(index: number) {
    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id === this.mechanicMeldingein[index].id) {
        this.meldingen.splice(i, 1);
        break;
      }
    }
    this.mechanicMeldingein.splice(index, 1);
    this.check = false;
    this.meldingService.checkPendingStatus();
  }

  ophaalmelding(index: number) {
    this.meldingen[index].status = RequestStatus.Collect;
    this.check = false;
    this.meldingService.checkCollectStatus();
    this.meldingService.checkDeliveredStatus();
  }

  afrondMelding(index: number) {
    this.click = false;
    this.meldingen[index].status = RequestStatus.Finished;
    this.meldingService.checkCollectStatus();
  }

  // openDeliverPopup() {
  //   this.deliverChecker = true;
  // }

  sopenDeliverPopup() {
    this.towpopup = true;
  }

  noTow(index: number) {
    this.meldingen[index].status = RequestStatus.Finished;
    this.check = false;
    this.deliverChecker = false;
    this.meldingService.checkCollectStatus();
    this.meldingService.checkDeliveredStatus();
  }

  tow(index: number) {
    this.meldingen[index].status = RequestStatus.Collect;
    this.check = false;
    this.deliverChecker = false;
    this.meldingService.checkCollectStatus();
    this.meldingService.checkDeliveredStatus();
    this.bevestigd();
  }

  bevestigd() {
    this.showform = false;
    this.popupOpen = true;
    setTimeout(() => {
      this.popupOpen = false;
    }, 1000);
  }
}

