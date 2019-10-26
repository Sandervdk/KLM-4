import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PlaneTypes} from "../../services/planeTypes";
import {WagonTypes} from "../../services/wagonTypes";
import {BandenWagenComponent} from "./banden-wagen/banden-wagen.component";
import {Time} from "@angular/common";

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})

export class RequestFormComponent implements OnInit {
  @ViewChild('form', {static: false}) requestForm: NgForm;
  @ViewChild(BandenWagenComponent, {static: false}) bandenwagenComponent;

  private popupOpen: boolean = false;
  private popupText: String = "";

  private selectedEquipment = [WagonTypes.EQUIPMENT];
  private locationArray = [];
  private planeType: PlaneTypes = PlaneTypes.VLIEGTUIGTYPE;
  private equipmentList = Object.values(WagonTypes);
  private planeTypeList = Object.values(PlaneTypes);
  private locationSelected: boolean = false;

  private location: String;
  private deadline: Time;
  private

  constructor() {
  }

  ngOnInit() {
  }

    /**
   * yeet
   * @param newSelectedEquipment
   * @param oldSelectedEquipment
   */
  addEquipment(newSelectedEquipment: WagonTypes, oldSelectedEquipment: WagonTypes) {
    //Removes the old selected equipment from the list with currently selected equipment
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (oldSelectedEquipment === this.selectedEquipment[i] && oldSelectedEquipment !== WagonTypes.EQUIPMENT) {
        this.remove(oldSelectedEquipment);
      }
    }

    //removes the selected equipment from the available equipment list
    for (let i = 0; i < this.equipmentList.length; i++) {
      if (this.equipmentList[i] === newSelectedEquipment) {
        this.equipmentList.splice(i, 1);
      }
    }

    //moves the base equipment item behind the new selected equipment
    this.selectedEquipment.pop();
    this.selectedEquipment.push(newSelectedEquipment);
    this.selectedEquipment.push(WagonTypes.EQUIPMENT);
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
    this.equipmentList.push(equipment);
  }

  /**
   * yeet
   * @param button
   * @param index
   */
  buttonSelected(button, index) {
    for (let i = 0; i < button.parentNode.childElementCount; i++) {
      (<HTMLButtonElement> button.parentNode.childNodes[i]).classList.remove("btn-selected");
    }

    if (this.locationArray.length > index)
      this.locationArray[index] = button.innerHTML;
    else
      this.locationArray.push(button.innerHTML);

    button.classList.add("btn-selected");
  }

  /**
   * yeet
   * @param planetype
   */
  changeType(planetype: PlaneTypes) {
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] === WagonTypes.BANDENWAGEN) {
        this.bandenwagenComponent.changeType(planetype);
      }
    }
  }

  /**
   * yeet
   */
  onSubmit() {
    //closes the popup in case there still is one open
    this.popupOpen = false;

    //Stops the submit function in case some content hasn't been filled in
    if(!this.checkValidity()) {
      console.log("wut")
      return;
    }

    //The selected equipment array will always contain an extra equipment piece as placeholder text for the dropdown
    //todo do stuff


    //todo loops through every piece of selected equipment and creates
    for (let i = 0; i < this.selectedEquipment.length - 1; i++) {
      console.log(this.location + " - " + this.deadline + " - " + this.planeType);
      if (this.selectedEquipment[i] === WagonTypes.BANDENWAGEN) {
        console.log(this.bandenwagenComponent.getTireWagon());
      }
    }

    //displays a popup when a request has been made
    this.openPopup("Request is aangemaakt")
  }

  /**
   * Checks every possible option in the
   */
  private checkValidity(): boolean {
    //checks if a planetype is selected and displays a popup
    if (this.planeType === PlaneTypes.VLIEGTUIGTYPE) {
      this.openPopup("Er is geen vliegtuig type geselecteerd");
      return false;
    }

    //Checks if there is any equipment selected and displays a popup
    if (this.selectedEquipment.length === 1) {
      this.openPopup("Er is geen equipment geselecteerd");
      return false;
    }

    //Checks if all the the locations have been selected, if some are missing a popup will be shown and method stops
    if (this.locationArray.length !== this.selectedEquipment.length - 1) {
      this.openPopup("Er zijn geen locatie voor equipment geselecteerd");
      return false;
    }

    for (let i = 0; i < this.selectedEquipment.length - 1; i++) {

      if (this.selectedEquipment[i] === WagonTypes.BANDENWAGEN) {
        if (this.bandenwagenComponent.getTireAmount() < 1) {
          this.openPopup("Aantal banden niet aangegeven");
          return false;
        }
      }
    }
    return true;
  }

  private openPopup(text: String): void {
    this.popupOpen = true;
    this.popupText = text;

    setTimeout(() => {
      this.popupOpen = false;
    }, 3000);
  }
}
