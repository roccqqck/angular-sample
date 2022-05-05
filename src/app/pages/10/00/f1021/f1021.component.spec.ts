import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1021Component } from './f1021.component';

describe('F1021Component', () => {
  let component: F1021Component;
  let fixture: ComponentFixture<F1021Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1021Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F1021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
