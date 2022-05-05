import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowSelectComponent } from './form-row-select.component';

describe('FormRowSelectComponent', () => {
  let component: FormRowSelectComponent;
  let fixture: ComponentFixture<FormRowSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRowSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
