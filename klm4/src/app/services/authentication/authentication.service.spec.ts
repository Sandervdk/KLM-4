import {TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {RouterTestingModule} from '@angular/router/testing';
import {RouterModule} from '@angular/router';
import {AppComponent} from '../../app.component';
import {SignInComponent} from '../../components/sign-in/sign-in.component';
import {Employee} from '../../models/staff/Employee';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, RouterModule
    ],
    providers: [AuthenticationService],
    declarations: [SignInComponent]
  }));

  beforeEach(() => {
    const user = new Employee('test', 'test', 'test@gmail.com', 'heyYeah', 'MECHANIC', 25);
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
