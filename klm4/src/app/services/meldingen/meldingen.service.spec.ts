import {TestBed} from '@angular/core/testing';

import {MeldingenService} from './meldingen.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../authentication/authentication.service';
import {Melding} from "../../models/melding/melding";
import {PlaneTypes} from "../../models/enums/planeTypes";
import {TailType} from "../../models/enums/tailTypeEnums/TailTypes";
import {WagonTypes} from "../../models/enums/wagonTypes";
import {RequestStatus} from "../../models/enums/requestStatus";

describe('MeldingenService', () => {
  let melding: Melding;
  let melding2: Melding;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule],
    providers: [AuthenticationService]
  }));

  it('should be created', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    expect(service).toBeTruthy();
  });

  /**
   * @Author Ali Butt
   * checks the allemeldingen array
   * the length should be by default 0
   */
  it('check alle meldingen length', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    expect(0).toBe(service.getAlleMeldingen.length);
  });

  /**
   * @Author Ali Butt
   * checks the mechanicmeldingen array
   * the length should be by default 0
   */
  it('check mechanic meldingen length', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    expect(0).toBe(service.getMechanicMeldingen().length);
  });

  /**
   * @Author Ali Butt
   * adds 1 mechanic melding in mmeldingenservice.mechanicmeldingen
   * the length of the array becomes 1
   */
  it('adds 1 mechanic melding', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
     melding = new Melding(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
       WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
       1001, null, null, new Date());
     service.mechanicMeldingen.push(melding);
    expect(1).toBe(service.getMechanicMeldingen().length);
  });

  /**
   * @Author Ali Butt
   * gets the melding by id from meldingservice.meldingen
   * displays full melding
   */
  it('gets melding by id', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    melding = new Melding(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
      WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
      1001, null, null, new Date());
    service.meldingen.push(melding);
    expect(melding).toBe(service.getRequesetById(1));
  });

  /**
   * @Author Ali Butt
   * changes the status of melding.ID: 2 to Accepted
   */
  it('changes melding status to Accepted', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    melding = new Melding(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
      WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
      1001, null, null, new Date());
    melding2 = new Melding(2, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
      WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
      1001, null, null, new Date());
    service.meldingen.push(melding);
    service.meldingen.push(melding2);
    service.AcceptstatusRequest(2);
    expect('Accepted').toBe(service.meldingen[1].status);
  });

  /**
   * @Author Ali Butt
   * changes the status of melding.ID: 1 to Delivered
   */
  it('changes meldingstatus to Delivered', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    melding = new Melding(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
      WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
      1001, null, null, new Date());
    service.meldingen.push(melding);
    service.deliverstatusRequest(1);
    expect('Delivered').toBe(service.meldingen[0].status);
  });

  /**
   * @Author Maninder Singh
   * changes the status of melding.ID: 1 to Finished
   */
  it('changes meldingstatus to Finished', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    melding = new Melding(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
      WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
      1001, null, null, new Date());
    service.meldingen.push(melding);
    service.finishedstatusRequest(1);
    expect('Finished').toBe(service.meldingen[0].status);
  });

  /**
   * @Author Maninder Singh
   * selected wagon should be changed to 35
   */
  it('changes selectedwagon to randomID', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    melding = new Melding(1, 'C3', new Date(), PlaneTypes.BOEING747400F, TailType.PH_AKA,
      WagonTypes.TIRECART, 0, 'Right', RequestStatus.Pending, null,
      1001, null, null, new Date());
    service.meldingen.push(melding);
    service.selectedwagonchange(1);
    expect(35).toBe(service.meldingen[0].selectedWagon);
  });

});
