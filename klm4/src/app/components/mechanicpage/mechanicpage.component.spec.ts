import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MechanicpageComponent} from './mechanicpage.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MeldingenService} from '../../services/meldingen/meldingen.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MechanicpageComponent', () => {
  let component: MechanicpageComponent;
  let fixture: ComponentFixture<MechanicpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MechanicpageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [MeldingenService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
