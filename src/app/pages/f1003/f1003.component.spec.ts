import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1003Component } from './f1003.component';

describe('F1003Component', () => {
  let component: F1003Component;
  let fixture: ComponentFixture<F1003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1003Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F1003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
