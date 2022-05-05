import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityControlComponent } from './security-control.component';

describe('SecurityControlComponent', () => {
  let component: SecurityControlComponent;
  let fixture: ComponentFixture<SecurityControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
