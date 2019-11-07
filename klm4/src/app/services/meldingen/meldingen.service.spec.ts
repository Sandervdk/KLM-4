import { TestBed } from '@angular/core/testing';

import { MeldingenService } from './meldingen.service';

describe('MeldingenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    expect(service).toBeTruthy();
  });
});
