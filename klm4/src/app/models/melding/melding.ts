import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {RequestStatus} from '../enums/requestStatus';
import {TailType} from '../enums/tailTypeEnums/TailTypes';
import {Cart} from '../carts/Cart.model';

export class Melding {
  id: number;
  location: string;
  requestTime: Date;
  deadline: Date;
  planetype: PlaneTypes;
  tailtype: TailType;
  wagonType: WagonTypes;
  selectedCart: Cart;
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
              tailtype: TailType, wagonType: WagonTypes, selectedCart: Cart, position: string,
              status: RequestStatus, extraInfo: string) {
    this.id = id;
    this.location = location;
    this.requestTime = requestTime;
    this.deadline = deadline;
    this.planetype = planetype;
    this.tailtype = tailtype;
    this.wagonType = wagonType;
    this.selectedCart = selectedCart;
    this.position = position;
    this.status = status;
    this.extraInfo = extraInfo;
  }

  /**
   * This method is used on the MapComponent for letting the runner pick a Cart that he or she's using
   *
   * @param cart the selected cart on the map
   */
  public pickCart(cart: Cart) {
    this.selectedCart = cart;
  }
}


