import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F1005Component } from './f1005.component';

describe('F1005Component', () => {
  let component: F1005Component;
  let fixture: ComponentFixture<F1005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F1005Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F1005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
