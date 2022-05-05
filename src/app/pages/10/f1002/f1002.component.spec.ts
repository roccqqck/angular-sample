import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1002Component } from './f1002.component';

describe('F1002Component', () => {
  let component: F1002Component;
  let fixture: ComponentFixture<F1002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1002Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F1002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
