import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {NgForm} from '@angular/forms';
import {MechanicService} from '../mechanicpage/mechanic.service';
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-damaged-form',
  templateUrl: './damaged-form.component.html',
  styleUrls: ['./damaged-form.component.css']
})
export class DamagedFormComponent implements OnInit {
  private showform: boolean = false;
  private popupOpen: boolean = false;
  private planeTypeList = Object.values(PlaneTypes);
  private planeType: PlaneTypes = PlaneTypes.VLIEGTUIGTYPE;
  private currentTime = new Date().toLocaleTimeString().substring(0, 5);

  @ViewChild('damageForm', {static: false}) damageForm: NgForm;


  constructor(private mechanicRouter: MechanicService, private authentication: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(){
    // this.popupOpen = true;
    // setTimeout(() => {
    //   this.popupOpen = false;
    // }, 3000);
  }

  /**
   * Hides the form when its confirmed.
   * names can be changed in something better.
   */
  bevestigd() {
    this.showform = false;
    this.popupOpen = true;
    setTimeout(() => {
      this.popupOpen = false;
    }, 1500);
  }

  onSumbitDamageForm(damageForm: NgForm) {

  }

  getShowForm() :boolean {
    return this.showform;
  }
}
