import {PlaneTypes} from '../enums/planeTypes';
import {WagonTypes} from '../enums/wagonTypes';
import {RequestStatus} from '../enums/requestStatus';
import {TailType} from '../enums/tailTypeEnums/TailTypes';
import {Cart} from '../carts/Cart.model';

export class Melding {
  id: number;
  location: string;
  completionTime: Date;
  deadline: Date;
  planeType: PlaneTypes;
  tailType: TailType;
  wagonType: WagonTypes;
  selectedCart: Cart;
  position: string;
  status: RequestStatus;
  extraInfo: string;
  mechanicId: number;

  constructor(id: number, location: string, completionTime: Date, deadline: Date, planetype: PlaneTypes,
              tailtype: TailType, wagonType: WagonTypes, selectedCart: Cart, position: string,
              status: RequestStatus, extraInfo: string, mechanicId: number) {
    this.id = id;
    this.location = location;
    this.completionTime = completionTime;
    this.deadline = deadline;
    this.planeType = planetype;
    this.tailType = tailtype;
    this.wagonType = wagonType;
    this.selectedCart = selectedCart;
    this.position = position;
    this.status = status;
    this.extraInfo = extraInfo;
    this.mechanicId = mechanicId;
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


