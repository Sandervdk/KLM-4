import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {PlaneTypes} from "../../../models/enums/planeTypes";

@Component({
  selector: 'tire-wagon',
  templateUrl: './tire-wagon.html',
  styleUrls: ['./tire-wagon.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TireWagon implements OnInit {
  private differentTireTypes: boolean;
  @Input('planeType') PlaneType: PlaneTypes;


  private noseTires: number;
  private mainTires: number;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.changeType(this.PlaneType);
  }

  changeType(planeType: PlaneTypes) {
    switch (planeType) {
      case PlaneTypes.A330_300: this.differentTireTypes = false; break;
      case PlaneTypes.B737_700: this.differentTireTypes = true; break;
      case PlaneTypes.A330_200: this.differentTireTypes = true; break;
    }
    this.cd.detectChanges();
  }

  // getTireWagon(): TireWagon {
  //   if (this.differentTireTypes) {
  //     return new TireWagon(this.mainTires, this.noseTires)
  //   } else {
  //     return new TireWagon(this.mainTires);
  //   }
  // }

  getTireAmount(): number {
    if (this.noseTires === undefined && this.mainTires === undefined) {
      return 0
    } else if (this.noseTires === undefined) {
      return this.mainTires;
    } else if (this.mainTires === undefined) {
      return this.noseTires;
    } else {
      return this.noseTires + this.mainTires;
    }
  }

}
