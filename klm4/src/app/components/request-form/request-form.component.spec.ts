import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {RequestFormComponent} from './request-form.component';
import {TireWagon} from "./tire-wagon/tire-wagon";
import {MechanicAnimationComponent} from "../global/mechanic-animation/mechanic-animation.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SignInComponent} from "../sign-in/sign-in.component";

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [RequestFormComponent, TireWagon, MechanicAnimationComponent, SignInComponent],
    }).compileComponents();
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

  it('Should have a valid location', fakeAsync(() => {
    fixture.whenStable().then(() => {
      component.setLocation("C4");
      expect(document.getElementById('location').innerHTML).toContain('C4');
      expect(document.getElementById('location').classList).toContain('ng-valid');
    });
  }));

  it('Should show a red outline for an invalid location', fakeAsync (() => {
    fixture.whenStable().then(() => {
      component.setLocation("Dank memes");
      expect(document.getElementById('location').innerHTML).toContain('Dank memes');
      expect(document.getElementById('location').classList).toContain('ng-valid');
    })

  }));

  it('Should show the deadline as the current time', fakeAsync(() => {
    fixture.detectChanges();
    component.getDeadline();
    expect(component.getDeadline()).toEqual(new Date().toTimeString().substr(0, 5));
  }));

});
