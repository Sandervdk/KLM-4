import {TestBed} from '@angular/core/testing';

import {MeldingenService} from './meldingen.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../authentication/authentication.service';

describe('MeldingenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule],
    providers: [AuthenticationService],
  }));

  it('should be created', () => {
    const service: MeldingenService = TestBed.get(MeldingenService);
    expect(service).toBeTruthy();
  });
});
