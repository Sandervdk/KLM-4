import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RequestFormComponent } from './request-form.component';
import {TireWagon} from "./tire-wagon/tire-wagon";
import {MechanicAnimationComponent} from "../global/mechanic-animation/mechanic-animation.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {MeldingenService} from "../../services/meldingen/meldingen.service";
import {Employee} from "../../models/staff/Employee";

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ RequestFormComponent, TireWagon, MechanicAnimationComponent],
    }) .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a valid location', fakeAsync (() => {
    tick();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.setLocation("C4");
      expect(document.getElementById('location').innerHTML).toContain('C4');
      expect(document.getElementById('location').classList).toContain('ng-valid');
    });
  }));

  it('Should show a red outline for an invalid location', fakeAsync(() => {
    tick();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      component.setLocation("Dank memes");
      expect(document.getElementById('location').innerHTML).toContain('Dank memes');
      expect(document.getElementById('location').classList).toContain('ng-invalid');
    })

  }));

});
