import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAttentionComponent } from './form-attention.component';

describe('FormAttentionComponent', () => {
  let component: FormAttentionComponent;
  let fixture: ComponentFixture<FormAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
