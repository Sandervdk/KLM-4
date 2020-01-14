import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestFormComponent} from './request-form.component';
import {TireWagon} from "./tire-wagon/tire-wagon";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {PlaneTypes} from "../../models/enums/planeTypes";
import {WagonTypes} from "../../models/enums/wagonTypes";

/**
 * Made by: Sander van de Kamp
 */
describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [RequestFormComponent, TireWagon],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('Should have a valid location', () => {
    fixture.whenStable().then(() => {
      component.setLocation("C4");
      expect(document.getElementById('location').innerHTML).toContain('C4');
      expect(document.getElementById('location').classList).toContain('ng-valid');
    });
  });

  it('Should show a red outline for an invalid location', () => {
    fixture.whenStable().then(() => {
      component.setLocation("Dank memes");
      expect(document.getElementById('location').innerHTML).toContain('Dank memes');
      expect(document.getElementById('location').classList).toContain('ng-valid');
    })
  });

  it('Should show the deadline as the current time',() => {
    fixture.detectChanges();
    component.getDeadline();
    expect(component.getDeadline()).toEqual(new Date().toTimeString().substr(0, 5));
  });

  it('Should have a list of 10 different planetypes', () => {
    let options = document.getElementById('planeType').childNodes;
    // The childnodes contain a default option, a single comment and a __proto__ object, hence the 13
    expect(options.length).toEqual(13);
  })

  it('Should change number of possible tail types based on planetype', () => {
    fixture.whenStable().then(() => {
      component.setPlaneType(PlaneTypes.BOEING747400F);
      fixture.detectChanges();
      expect(document.getElementById('tailType').childNodes.length).not.toEqual(2);
    });
  });

  it('Should add another piece of equipment', () => {
    fixture.whenStable().then(() => {
      component.addNewEquipment();
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-input').length).not.toEqual(3);
    })
  })

});
