import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeldingenService} from '../../../services/meldingen/meldingen.service';
<<<<<<< HEAD
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Functions} from "../../../models/staff/Functions";
=======
import {meldingStatus} from '../../../models/melding/melding';
>>>>>>> meldingen fixes

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {
  private userRole: Functions;
  private id: number;

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
      this.meldingService.mechanicMeldingen[index].status = meldingStatus.Geaccepteerd;
    }
  }
}

