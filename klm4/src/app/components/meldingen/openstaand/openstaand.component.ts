import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeldingenService} from '../../../services/meldingen/meldingen.service';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Functions} from "../../../models/staff/Functions";
import {meldingStatus} from '../../../models/melding/melding';

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {
  private userRole: Functions;
  private id: number;
  damageFormOpen = false;

  constructor(private router: Router, private route: ActivatedRoute, private meldingService: MeldingenService,
              private authentication: AuthenticationService) {
  }

  ngOnInit() {
    this.userRole = this.authentication.getUser().getRole();
    this.id = this.authentication.getID();
  }

  /**
   * Should have a better name, but will change in future
   */
  nextScreen() {
    this.router.navigate(['/map'], {
      relativeTo: this.route
    });
  }

  showPopUp(index: number) {
    if (confirm('Weet je zeker dat je de melding wilt accepteren?')) {
      if (this.meldingService.mechanicMeldingen[index].status === meldingStatus.Afzetten) {
        this.meldingService.mechanicMeldingen[index].status = meldingStatus.Geaccepteerd;
      }
      else this.meldingService.mechanicMeldingen[index].status = meldingStatus.Afgerond;
    }
  }

  popUp(index: number) {
    if (confirm('Equipment is bezorgd?')) {
      this.meldingService.mechanicMeldingen[index].status = meldingStatus.Bezorgd;
    }
  }

  ophaalPopUp(index: number) {
    if (confirm('Weet je zeker dat je klaar bent?')) {
      this.meldingService.mechanicMeldingen[index].status = meldingStatus.Ophalen;
    }
  }

  showDamagedForm(index: number) {
    if (this.meldingService.mechanicMeldingen[index].status === meldingStatus.Bezorgd)
    this.damageFormOpen = true;
  }
}

