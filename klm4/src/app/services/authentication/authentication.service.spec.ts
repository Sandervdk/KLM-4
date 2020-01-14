import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {AppComponent} from '../../app.component';
import {SignInComponent} from '../../components/sign-in/sign-in.component';
import {Employee} from '../../models/staff/Employee';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, RouterModule
    ],
    providers: [AuthenticationService],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
  }));

  beforeEach(() => {
    const user = new Employee('test', 'test', 'test@gmail.com', 'heyYeah', 'MECHANIC', 25);
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
