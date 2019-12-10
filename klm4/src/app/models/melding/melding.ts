import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {RequestStatus} from "../enums/requestStatus";
import {TailType} from "../enums/tailType";

export class Melding {
  id: number;
  location: string;
  requestTime: Date;
  deadline: Date;
  planetype: PlaneTypes;
  tailtype: TailType;
  wagonType: WagonTypes;
  selectedWagon: string;
  position: string;
  status: RequestStatus;
  extraInfo: string;

  // constructor(id: number, location: string, deadline: Date, planetype: PlaneTypes, wagonType: WagonTypes, position: string, status: RequestStatus) {
  //   this.id = id;
  //   this.location = location;
  //   this.deadline = deadline;
  //   this.planetype = planetype;
  //   this.wagonType = wagonType;
  //   this.position = position;
  //   this.deadline = deadline;
  //   this.requestTime = new Date();
  //   this.status = status;
  // }


  constructor(id: number, location: string, requestTime: Date, deadline: Date, planetype: PlaneTypes,
              tailtype: TailType, wagonType: WagonTypes, selectedWagon: string, position: string,
              status: RequestStatus, extraInfo: string) {
    this.id = id;
    this.location = location;
    this.requestTime = requestTime;
    this.deadline = deadline;
    this.planetype = planetype;
    this.tailtype = tailtype;
    this.wagonType = wagonType;
    this.selectedWagon = selectedWagon;
    this.position = position;
    this.status = status;
    this.extraInfo = extraInfo;
  }
}


