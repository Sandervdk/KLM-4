import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeldingenService} from '../../../services/meldingen/meldingen.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Functions} from '../../../models/staff/Functions';
import {Melding} from '../../../models/melding/melding';
import {WagonTypes} from '../../../models/enums/wagonTypes';
import {DamagedFormComponent} from '../../damaged-form/damaged-form.component';
import {RunnerService} from '../../runnerpage/runner.service';
import {RequestStatus} from "../../../models/enums/requestStatus";

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {
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
              private authentication: AuthenticationService, private runnerService: RunnerService) {
  }

  ngOnInit() {
    this.userRole = this.authentication.getUser().getRole();
    this.id = this.authentication.getID();
    this.expandedInfo = [];
    this.numberOfButtons = 1;
    for (let i = 0; i < this.meldingService.mechanicMeldingen.length; i++) {
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
      if (this.meldingService.mechanicMeldingen[index].status === RequestStatus.Drop_Off) {
        this.meldingService.mechanicMeldingen[index].status = RequestStatus.Accepted;
        this.meldingService.index = index;
        this.nextScreen();
      } else {
        this.meldingService.mechanicMeldingen[index].status = RequestStatus.Finished;
      }
      this.expandedInfo[index] = false;
      this.oldIndex = undefined;
    }
  }

  popUp(index: number) {
    if (confirm('Equipment is bezorgd?')) {
      this.meldingService.mechanicMeldingen[index].status = RequestStatus.Delivered;
      this.expandedInfo[index] = false;
      this.oldIndex = undefined;
    }
  }

  ophaalPopUp(index: number) {
    if (confirm('Weet je zeker dat je klaar bent?')) {
      this.meldingService.mechanicMeldingen[index].status = RequestStatus.Collect;
    }
  }

  deleteRequest(index: number) {
    this.meldingService.mechanicMeldingen.splice(index, 1);
  }

  unfoldRow(index: number, subTable: Element) {
    //Disables the detailed dropdown list when the is a click on the close buttons in the sub table
    if (subTable === null || !subTable.classList.contains('clickableRow')) {
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
    this.selectedRequest = this.meldingService.mechanicMeldingen[index];

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

