import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPadComponent } from './dynamic-pad.component';

describe('DynamicPadComponent', () => {
  let component: DynamicPadComponent;
  let fixture: ComponentFixture<DynamicPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
