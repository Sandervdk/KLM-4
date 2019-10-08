import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenstaandComponent } from './openstaand.component';

describe('OpenstaandComponent', () => {
  let component: OpenstaandComponent;
  let fixture: ComponentFixture<OpenstaandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenstaandComponent ]
    })
    .compileComponents();
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
