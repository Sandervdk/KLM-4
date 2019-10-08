import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  @ViewChild('form', {static: false}) requestForm: NgForm;
  private popupOpen: boolean = false;
  private selectedEquipment = ["Equipment"];
  private equipmentList = ["Stikstofwagen", "Bandenwagen", "Skydrolwagen", "Remmenwagen", "IDGWagen", "Pomptrappen",
      "Pylon trappen", "Trap", "Polar Heaters", "Generator", "Aanhangwagen", "Hoogwerker", "Drainwagen", "bandenkar", "airdatakar", "gritwagen"]
  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.popupOpen = true;
    setTimeout(() => {this.popupOpen = false}, 3000);
  }

  addEquipment(data, oldSelectedEquipment) {
    //Removes the old selected equipment from the list with currently selected equipment
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (oldSelectedEquipment === this.selectedEquipment[i] && oldSelectedEquipment !== 'Equipment') {
        this.remove(oldSelectedEquipment);
      }
    }
    //removes the selected equipment from the available equipment list
    for (let i = 0; i < this.equipmentList.length; i++) {
      if (this.equipmentList[i] == data) {
        this.equipmentList.splice(i, 1);
      }
    }
    this.selectedEquipment.pop();
    this.selectedEquipment.push(data);
    this.selectedEquipment.push("Equipment");
  }

  remove(data) {
    for (let i = 0; i < this.selectedEquipment.length; i++) {
      if (this.selectedEquipment[i] == data) {
        this.selectedEquipment.splice(i, 1);
      }
    }
    this.equipmentList.push(data);
  }

}
