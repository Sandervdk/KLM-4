import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenstaandComponent} from './openstaand.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {RunnerAnimationComponent} from '../../global/runner-animation/runner-animation.component';
import {Admin} from '../../../models/staff/Admin';
import {Mechanic} from '../../../models/staff/Mechanic';

describe('OpenstaandComponent', () => {
  let component: OpenstaandComponent;
  let fixture: ComponentFixture<OpenstaandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [OpenstaandComponent, RunnerAnimationComponent],
      providers: [AuthenticationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    service.createUser(new Mechanic('test', 'test',
      'test@gmail.com', 'hellyeah', 25))
    fixture = TestBed.createComponent(OpenstaandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
