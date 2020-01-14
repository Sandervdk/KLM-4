import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenstaandComponent} from './openstaand.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {DamagedFormComponent} from "../../damaged-form/damaged-form.component";
import {RunnerAnimationComponent} from "../../global/runner-animation/runner-animation.component";
import {MeldingenService} from "../../../services/meldingen/meldingen.service";

describe('OpenstaandComponent', () => {
  let component: OpenstaandComponent;
  let fixture: ComponentFixture<OpenstaandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [OpenstaandComponent, DamagedFormComponent, RunnerAnimationComponent],
      providers: [AuthenticationService, MeldingenService]
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
