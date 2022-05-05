import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1004Component } from './f1004.component';

describe('F1004Component', () => {
  let component: F1004Component;
  let fixture: ComponentFixture<F1004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1004Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F1004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
