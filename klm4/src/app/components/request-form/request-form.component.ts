import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PlaneTypes} from '../../models/enums/planeTypes';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {TireWagon} from './tire-wagon/tire-wagon';
import {Time} from '@angular/common';
import {MeldingenService} from '../../services/meldingen/meldingen.service';
import {Melding} from '../../models/melding/melding';
import {MechanicService} from '../mechanicpage/mechanic.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Router} from '@angular/router';
import {RequestStatus} from '../../models/enums/requestStatus';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})

export class RequestFormComponent implements OnInit {
  @ViewChild('form', {static: false}) requestForm: NgForm;
  @ViewChild(TireWagon, {static: false}) tireWagonComponent;

  private popupOpen: boolean = false;
  private popupText: String = '';
  private addIcon: boolean = false;

  private selectedEquipment = [WagonTypes.EQUIPMENT];
  private locationArray = [];
  private planeType: PlaneTypes = PlaneTypes.VLIEGTUIGTYPE;
  private equipmentList = Object.values(WagonTypes);
  private planeTypeList = Object.values(PlaneTypes);
  private locationSelected: boolean = false;
  private equipmentEnums = WagonTypes;

  private location: string;
  private deadline: Time;
  private mechanicAnimation: boolean;

  constructor(private meldingService: MeldingenService, private mechanicRouter: MechanicService,
              private authentication: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  /**f
   * yeet
   * @param newSelectedEquipment
   * @param oldSelectedEquipment
   */
  addEquipment(newSelectedEquipment: WagonTypes, oldSelectedEquipment: WagonTypes, index: number) {
    // Removes the old selected equipment from the list with currently selected equipment
    if (this.selectedEquipment[index] === this.equipmentEnums.EQUIPMENT) {
      this.selectedEquipment[index] = newSelectedEquipment;
    } else {
      this.remove(oldSelectedEquipment);
      this.selectedEquipment.push(newSelectedEquipment);
    }

    // removes the selected equipment from the available equipment list
    for (let i = 0; i < this.equipmentList.length; i++) {
      if (this.equipmentList[i] === newSelectedEquipment) {
        this.equipmentList.splice(i, 1);
      }
    }
  }

  /**
   * Removes an item from the selected equipment list and places it in the list with available equipment
   * todo sort the list based on mosed used pieces of equipment
   * @param equipment the piece of equipment that was selected
   */
  remove(equipment) {
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === equipment) {
        this.selectedEquipment.splice(i, 1);
        this.locationArray.splice(i, 1);
      }
    }
    //If the piece of equipment that is being removed from the selected equipment list isn't the default equipment
    //enum, it will place the equipment back in the selectable equipmentlist
    if (equipment !== this.equipmentEnums.EQUIPMENT) {
      this.equipmentList.push(equipment);
    }
  }

  /**
   * yeet
   * @param button
   * @param index
   */
  buttonSelected(button, index) {
    for (let i = 0; i < button.parentNode.childElementCount; i++) {
      (<HTMLButtonElement> button.parentNode.childNodes[i]).classList.remove('btn-selected');
    }

    if (this.locationArray.length > index) {
      this.locationArray[index] = button.innerHTML;
    } else {
      this.locationArray.push(button.innerHTML);
    }

    button.classList.add('btn-selected');
  }

  /**
   * yeet
   * @param planetype
   */
  changeType(planetype: PlaneTypes) {
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === WagonTypes.BANDENWAGEN) {
        this.tireWagonComponent.changeType(planetype);
      }
    }
  }

  /**
   * yeet
   */
  onSubmit() {
    // closes the popup in case there still is one open
    this.popupOpen = false;

    // Stops the submit function in case some content hasn't been filled in
    if (!this.checkValidity()) {
      return;
    }
  }

  public generateTime() {
    return new Date().toLocaleTimeString();
  }

  /**
   * Checks every possible option in the
   */
  private checkValidity(): boolean {
    // checks if a planetype is selected and displays a popup
    if (this.planeType === PlaneTypes.VLIEGTUIGTYPE) {
      this.openPopup('Er is geen vliegtuig type geselecteerd');
      return false;
    }

    // Checks if there is any equipment selected and displays a popup
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      let tempEquipemnt = this.selectedEquipment[i];
      if (tempEquipemnt === this.equipmentEnums.EQUIPMENT) {
        this.openPopup('Er is geen equipment geselecteerd');
        return false;
      }
    }

    // Checks if all the the locations have been selected, if some are missing a popup will be shown and method stops
    if (this.locationArray.length !== this.selectedEquipment.length) {
      this.openPopup('Er zijn geen locatie voor equipment geselecteerd');
      return false;
    }

    // Checks for each different type of equipment if the equipment specific info has been filled in.
    //todo MOVE TO THE SPECIFIC COMPONENT TS FILES
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === WagonTypes.BANDENWAGEN) {
        if (this.tireWagonComponent.getTireAmount() < 1) {
          this.openPopup('Aantal banden niet aangegeven');
          return false;
        }
      }
    }

    // loops through the selected equipment array and adds a new request for each piece of equipment, each requests
    // gets the ID of the currently logged in user
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      this.meldingService.mechanicMeldingen.push(new Melding(this.authentication.getID(), this.location,
        new Date(new Date().setHours(
          parseInt(this.deadline.toString().substr(0, 3)),
          parseInt(this.deadline.toString().substr(3)), 0, 0)),
        this.planeType, this.selectedEquipment[i], this.locationArray[i], RequestStatus.Drop_Off));
    }

    // rerouts the user to the made requests screen after adding all the requests.
    this.mechanicAnimation = true;

    setTimeout(() => {
      this.mechanicAnimation = false;
      this.router.navigate(['/mechanic/meldingen-openstaand']);
    }, 1500);


  }

  private openPopup(text: string): void {
    this.popupOpen = true;
    this.popupText = text;

    setTimeout(() => {
      this.popupOpen = false;
    }, 3000);
  }

  addNewEquipment() {
    this.selectedEquipment.push(WagonTypes.EQUIPMENT);
    this.locationArray.push('');
  }
}
