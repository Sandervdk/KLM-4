import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {RequestStatus} from "../enums/requestStatus";

export class Melding {
  id: number;
  location: string;
  requestTime: Date;
  deadline: Date;
  planetype: PlaneTypes;
  wagonType: WagonTypes;
  position: string;
  status: RequestStatus;

  constructor(id: number, location: string, deadline: Date, planetype: PlaneTypes, wagonType: WagonTypes, position: string, status: RequestStatus) {
    this.id = id;
    this.location = location;
    this.deadline = deadline;
    this.planetype = planetype;
    this.wagonType = wagonType;
    this.position = position;
    this.deadline = deadline;
    this.requestTime = new Date();
    this.status = status;
  }
}


