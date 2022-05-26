import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTouchComponent } from './one-touch.component';

describe('OneTouchComponent', () => {
  let component: OneTouchComponent;
  let fixture: ComponentFixture<OneTouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTouchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
