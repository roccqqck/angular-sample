import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowSslComponent } from './form-row-ssl.component';

describe('FormRowSslComponent', () => {
  let component: FormRowSslComponent;
  let fixture: ComponentFixture<FormRowSslComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRowSslComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowSslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
