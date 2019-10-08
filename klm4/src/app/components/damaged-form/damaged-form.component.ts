import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-damaged-form',
  templateUrl: './damaged-form.component.html',
  styleUrls: ['./damaged-form.component.css']
})
export class DamagedFormComponent implements OnInit {
  private showform: boolean = false;
  private popupOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    // this.popupOpen = true;
    // setTimeout(() => {
    //   this.popupOpen = false;
    // }, 3000);
  }

  /**
   * Shows the popup.
   * names can be changed in something better.
   */
  showPopUp() {
    this.showform = true;
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
    }, 3000);
  }
}
