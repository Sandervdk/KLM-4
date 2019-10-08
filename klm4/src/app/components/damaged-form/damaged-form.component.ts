import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-damaged-form',
  templateUrl: './damaged-form.component.html',
  styleUrls: ['./damaged-form.component.css']
})
export class DamagedFormComponent implements OnInit {
  showform = false;

  constructor() { }

  ngOnInit() {
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
  }
}
