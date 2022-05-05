import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceBindingComponent } from './device-binding.component';

describe('DeviceBindingComponent', () => {
  let component: DeviceBindingComponent;
  let fixture: ComponentFixture<DeviceBindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceBindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
