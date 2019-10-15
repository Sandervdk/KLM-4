import { TestBed } from '@angular/core/testing';

import { WagonsService } from './wagons.service';

describe('WeagonsServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WagonsService = TestBed.get(WagonsService);
    expect(service).toBeTruthy();
  });
});
