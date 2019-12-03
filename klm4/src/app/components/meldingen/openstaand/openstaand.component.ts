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
import off = DomEvent.off;

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {
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
  private equipmentlist = WagonTypes;
  public runnerAnimation = false;

  @ViewChild('damageForm', {static: false}) damageForm: DamagedFormComponent;

  constructor(private router: Router, private route: ActivatedRoute, private meldingService: MeldingenService,
              private authentication: AuthenticationService) {
  }

  ngOnInit() {
    this.userRole = this.authentication.getUser().getRole();
    this.id = this.authentication.getID();
    this.expandedInfo = [];
    this.numberOfButtons = 1;
    this.meldingen = this.meldingService.getMeldingen();
    this.mechanicMeldingein = this.meldingService.getMechanicMeldingen();
    for (let i = 0; i < this.meldingen.length; i++) {
      this.expandedInfo.push(false);
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

  showPopUp(index: number) {
    if (confirm('Weet je zeker dat je de melding wilt accepteren?')) {
      if (this.meldingen[index].status === RequestStatus.Pending) {
        this.meldingen[index].status = RequestStatus.Accepted;
        this.meldingService.index = index;
        this.nextScreen();
      } else {
        this.meldingen[index].status = RequestStatus.Finished;
      }
      this.expandedInfo[index] = false;
      this.oldIndex = undefined;
    }
  }

  popUp(index: number) {
    if (confirm('Equipment is bezorgd?')) {
      this.meldingen[index].status = RequestStatus.Delivered;
      this.expandedInfo[index] = false;
      this.oldIndex = undefined;
    }
  }

  ophaalPopUp(index: number) {
    if (confirm('Weet je zeker dat je klaar bent?')) {
      this.meldingen[index].status = RequestStatus.Collect;
    }
  }

  deleteRequest(index: number) {
    this.mechanicMeldingein.splice(index, 1);
    this.expandedInfo[index] = false;
  }

  unfoldRow(index: number, subTable: Element) {
    // Disables the detailed dropdown list when the is a click on the close buttons in the sub table
    if (subTable === null || !subTable.classList.contains('clickableRow') && !subTable.classList.contains('extraInfoHeader')) {
      return;
    }

    if (this.damageFormOpen) {
      this.damageFormOpen = this.damageForm.getShowForm();
    }

    if (index === this.oldIndex) {
      this.expandedInfo[index] = !this.expandedInfo[index];
      this.oldIndex = undefined;
      return;
    }

    this.numberOfButtons = 1;
    this.expandedInfo[index] = true;
    if (this.userRole === 'MECHANIC') {
      this.selectedRequest = this.mechanicMeldingein[index];
    } else {
      this.selectedRequest = this.meldingen[index];
    }

    if (this.selectedRequest.status === RequestStatus.Delivered && this.userRole === 'MECHANIC') {
      this.numberOfButtons += 2;
      this.equipmentIsBezorgd = true;
    } else if (this.selectedRequest.status === RequestStatus.Accepted && this.userRole === 'RUNNER') {
      this.numberOfButtons += 2;
      this.equipmentIsBezorgd = true;
    }

    this.expandedInfo[this.oldIndex] = false;
    this.oldIndex = index;
  }

  openDamageForm() {
    this.damageFormOpen = true;
  }
}

