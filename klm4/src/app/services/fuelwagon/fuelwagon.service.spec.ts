import { TestBed } from '@angular/core/testing';

import { FuelwagonService } from './fuelwagon.service';

describe('FuelwagonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuelwagonService = TestBed.get(FuelwagonService);
    expect(service).toBeTruthy();
  });
});
