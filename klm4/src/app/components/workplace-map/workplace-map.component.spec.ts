import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkplaceMapComponent} from './workplace-map.component';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WagonsService} from '../../services/wagons/wagons.service';
import {MeldingenService} from '../../services/meldingen/meldingen.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Mechanic} from '../../models/staff/Mechanic';


describe('WorkplaceMapComponent', () => {
  let component: WorkplaceMapComponent;
  let fixture: ComponentFixture<WorkplaceMapComponent>; // test environment for the component

  beforeEach(async(() => {
    TestBed.configureTestingModule({ // isolated test for the component itself
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      providers: [WagonsService, MeldingenService, AuthenticationService],
      declarations: [WorkplaceMapComponent]
    }).compileComponents(); // compiles template and css of the component
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkplaceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Check if component is being created successful
   */
  it('should create map', () => {
    expect(component).toBeTruthy();
  });

});
