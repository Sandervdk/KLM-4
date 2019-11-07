import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductenpageComponent } from './productenpage.component';

describe('ProductenpageComponent', () => {
  let component: ProductenpageComponent;
  let fixture: ComponentFixture<ProductenpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductenpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductenpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
