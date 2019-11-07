import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicpageComponent } from './mechanicpage.component';

describe('MechanicpageComponent', () => {
  let component: MechanicpageComponent;
  let fixture: ComponentFixture<MechanicpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MechanicpageComponent ]
    })
    .compileComponents();
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
