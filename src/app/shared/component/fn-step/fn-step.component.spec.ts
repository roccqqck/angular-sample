import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnStepComponent } from './fn-step.component';

describe('FnStepComponent', () => {
  let component: FnStepComponent;
  let fixture: ComponentFixture<FnStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FnStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FnStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
