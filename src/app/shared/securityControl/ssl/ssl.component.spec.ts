import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSLComponent } from './ssl.component';

describe('SSLComponent', () => {
  let component: SSLComponent;
  let fixture: ComponentFixture<SSLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SSLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
