import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {PlaneTypes} from "../../../services/planeTypes";
import {TireWagon} from "../../../services/wagons/Wagon/tireWagon";

@Component({
  selector: 'banden-wagen',
  templateUrl: './banden-wagen.component.html',
  styleUrls: ['./banden-wagen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BandenWagenComponent implements OnInit {
  private differentTireTypes: boolean;
  @Input('planeType') PlaneType: PlaneTypes;


  private noseTires: number;
  private mainTires: number;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    console.log(this.PlaneType);
    this.changeType(this.PlaneType);
  }

  changeType(planeType: PlaneTypes) {
    switch (planeType) {
      case PlaneTypes.Ambraer190: this.differentTireTypes = false; break;
      case PlaneTypes.BOEING737: this.differentTireTypes = true; break;
      case PlaneTypes.AirbusA330: this.differentTireTypes = true; break;
    }
    this.cd.detectChanges();
  }

  getTireWagon(): TireWagon {
    if (this.differentTireTypes) {
      return new TireWagon(this.mainTires, this.noseTires)
    } else {
      return new TireWagon(this.mainTires);
    }
  }

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
