import {TestBed} from '@angular/core/testing';

import {WagonsService} from './wagons.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Cart} from '../../models/carts/Cart.model';
import {WagonTypes} from '../../models/enums/wagonTypes';
import {EquipmentStatus} from '../../models/enums/equipmentStatus';
import {MeldingenService} from '../meldingen/meldingen.service';

describe('WagonService', () => {
  const cartTest = new Cart(1, 'THis is a test', 500, 500, WagonTypes.FUEL_CART, EquipmentStatus.AVAILABLE);
  beforeEach(() => TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [],
      providers: [MeldingenService, WagonsService]
    }).compileComponents()
  );

  it('should be created', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.createCart(cartTest)).toBeTruthy();
  });

  it('wagon must be ready to roll', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service.getLayer('testCart')).toBeNull();
  });
});
