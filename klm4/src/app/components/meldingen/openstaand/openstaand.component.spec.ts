import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenstaandComponent} from './openstaand.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

describe('OpenstaandComponent', () => {
  let component: OpenstaandComponent;
  let fixture: ComponentFixture<OpenstaandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [OpenstaandComponent],
      providers: [AuthenticationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenstaandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
