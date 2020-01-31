import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeldingenService} from '../../../services/meldingen/meldingen.service';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Functions} from '../../../models/staff/Functions';
import {Melding} from '../../../models/melding/melding';
import {WagonTypes} from '../../../models/enums/wagonTypes';
import {DamagedFormComponent} from '../../damaged-form/damaged-form.component';
import {RequestStatus} from '../../../models/enums/requestStatus';
import {PlaneTypes} from '../../../models/enums/planeTypes';
import {WagonsService} from '../../../services/wagons/wagons.service';

@Component({
  selector: 'app-openstaand',
  templateUrl: './openstaand.component.html',
  styleUrls: ['./openstaand.component.css']
})
export class OpenstaandComponent implements OnInit {
  public isLoaded = false;
  public meldingen: Melding[];
  public mechanicMeldingein: Melding[];
  public userRole: Functions;
  public requestStatus = RequestStatus;
  public id: number;
  public damageFormOpen = false;
  public towpopup = false;
  public equipmentlist = WagonTypes;
  public planetypeenums = PlaneTypes;
  public runnerAnimation = false;
  public currentTimePlus15;
  public currentTimePlus45;      //Current time plus 45 minutes
  public click = false;
  public number;
  public deliverChecker = false;
  public showform: boolean = false;
  public popupOpen: boolean = false;

  @ViewChild('damageForm', {static: false}) damageForm: DamagedFormComponent;

  constructor(private router: Router, private route: ActivatedRoute, public meldingService: MeldingenService,
              private authentication: AuthenticationService, private wagonService: WagonsService) {
    this.currentTimePlus15 = new Date();
    this.currentTimePlus15.setTime(this.currentTimePlus15.getTime() + (15 * 60 * 1000));
    this.currentTimePlus45 = new Date();
    this.currentTimePlus45.setTime(this.currentTimePlus15.getTime() + (45 * 60 * 1000));
    this.meldingService.loadAllRequests();
  }

  ngOnInit() {
    this.userRole = this.authentication.getUser().getRole();
    this.id = this.authentication.getID();
    this.meldingService.loadAllRequests();
    this.checkIfLoaded();
  }

  /**
   * controls if all notifications have loaded or not
   * depending on the there is anything with a specific status it checks
   * if there needs to be a 'no notifications' text
   */
  public checkIfLoaded() {
    if (this.meldingService.isLoaded == true) {
      this.meldingen = this.meldingService.getMeldingen();
      this.mechanicMeldingein = this.meldingService.getMechanicMeldingen();
      this.isLoaded = true;
      this.meldingService.checkPendingStatus();
      this.meldingService.checkCollectStatus();
      this.meldingService.checkDeliveredStatus();
    } else {
      setTimeout(() => this.checkIfLoaded(), 500);
    }
  }

  /**
   * shows the runner transition animation for 2 seconds and forwards to the equipment map
   */
  nextScreen() {
    this.runnerAnimation = true;
    setTimeout(() => {
      this.runnerAnimation = false;
      this.router.navigate(['/runner/map'], {
        relativeTo: this.route
      });
    }, 2000);
  }

  /**
   * opens the damage-form
   */
  openDamageForm() {
    this.damageFormOpen = true;
  }

  /**
   * opens a pop-up for the runner
   * @param index adds the index of the notification
   */
  openPopUp(index: number) {
    this.click = true;
    this.setNumber(index);
  }

  /**
   * closes the runner pop-up
   */
  closePopUp() {
    this.click = false;
  }

  /**
   * gets the index-number of the notification and
   * adds it to meldingen-service
   * @param index -> notification index in array
   */
  setNumber(index: number) {
    this.number = index;
    this.meldingService.index = index;
  }

  /**
   * changes the notification status to 'Accepted"
   * closes the pop-up
   * updates the request-tables
   * @param index -> notification index in array
   */
  acceptMelding(index: number) {
    this.meldingen[index].status = RequestStatus.Accepted;
    this.meldingService.index = index;
    this.click = false;
    this.meldingService.updateRequest(this.meldingen[index]);
    this.meldingService.checkPendingStatus();
    this.meldingService.checkCollectStatus();
    this.nextScreen();
  }

  /**
   * opens the mechanic pop-up
   * @param index -> adds the index of the notification
   */
  openPopUp2(index: number) {
    this.meldingService.test = true;
    this.setNumber(index);
  }

  /**
   * closes the runner pop-up
   */
  closePopUp2() {
    this.meldingService.test = false;
  }

  /**
   * deletes the notification from the mechanic interface and removes it from the runner interface as well
   * @param index -> notification index
   */
  deleteMelding(index: number) {
    this.meldingService.deleteRequest(this.mechanicMeldingein[index].id);

    for (let i = 0; i < this.meldingen.length; i++) {
      if (this.meldingen[i].id === this.mechanicMeldingein[index].id) {
        this.meldingen.splice(i, 1);
        break;
      }
    }
    this.mechanicMeldingein.splice(index, 1);
    this.meldingService.test = false;
    this.meldingService.checkPendingStatus();

  }

  /**
   * changes the notification status to 'Finished' and checks the tables and changes the if needed
   * @param index -> notification index
   */
  afrondMelding(index: number) {
    this.click = false;
    this.meldingen[index].status = RequestStatus.Finished;
    this.meldingService.checkCollectStatus();
  }

  /**
   * opens the mechanic deliver pop-up
   * asking if the equipment needs to be towed away or not
   */
  openDeliverPopup() {
    this.towpopup = true;
  }

  /**
   * equipment doesn't need to be towed
   * the request-status changes to 'Finished' and changes the equipment-status to 'Available'
   * updates all requests at the end and closes the pop-up
   * @param index -> notification index
   */
  noTow(index: number) {
    this.mechanicMeldingein[index].status = RequestStatus.Finished;
    const cartID = this.meldingService.getMechanicMeldingen()[this.meldingService.index].selectedWagon;
    this.checkStatusOfCartForTowing(cartID, index);
    this.meldingService.test = false;
    this.deliverChecker = false;
    this.meldingService.updateRequest(this.mechanicMeldingein[index]);
  }

  /**
   * equipment need to be towed away, the request-status changes to 'Collect'
   * closes the pop-ups, updates all requests for all interfaces
   * shows a pop-up that the towing of your equipment has been requested
   * @param index -> notification index
   */
  tow(index: number) {
    this.mechanicMeldingein[index].status = RequestStatus.Collect;
    const cartID = this.meldingService.getMechanicMeldingen()[this.meldingService.index].selectedWagon;
    this.checkStatusOfCartForTowing(cartID, index);
    this.meldingService.test = false;
    this.deliverChecker = false;
    this.meldingService.updateRequest(this.mechanicMeldingein[index]);
    this.bevestigd();
  }

  /**
   * checks the equipment status and if it is possible to use
   * @param cartId -> the id of the cart
   * @param index -> notification index
   */
  checkStatusOfCartForTowing(cartId: number, index) {
    this.wagonService.getCartByID(cartId).subscribe(cart => {
      if (cart[0]) {
        const angularCart = this.wagonService.createCart(cart[0]);
        if (angularCart.getEquipmentStatus().toString() !== 'UNAVAILABLE') {
          this.wagonService.changeCartStatus(angularCart, 'AVAILABLE');
          this.meldingService.updateRequest(this.mechanicMeldingein[index]);
        }
      }
    });
  }

  /**
   * shows the text for 2,5 seconds that the towing of the equipment has been requested
   */
  bevestigd() {
    this.showform = false;
    this.popupOpen = true;
    setTimeout(() => {
      this.popupOpen = false;
    }, 2500);
  }
}

