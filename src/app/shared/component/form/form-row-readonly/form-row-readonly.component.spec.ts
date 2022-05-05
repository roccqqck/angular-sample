import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowReadonlyComponent } from './form-row-readonly.component';

describe('FormRowReadonlyComponent', () => {
  let component: FormRowReadonlyComponent;
  let fixture: ComponentFixture<FormRowReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRowReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
