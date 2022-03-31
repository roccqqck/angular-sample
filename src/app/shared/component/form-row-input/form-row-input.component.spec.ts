import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowInputComponent } from './form-row-input.component';

describe('FormRowInputComponent', () => {
  let component: FormRowInputComponent;
  let fixture: ComponentFixture<FormRowInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRowInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
