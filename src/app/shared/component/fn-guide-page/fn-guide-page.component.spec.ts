import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnGuidePageComponent } from './fn-guide-page.component';

describe('FnGuidePageComponent', () => {
  let component: FnGuidePageComponent;
  let fixture: ComponentFixture<FnGuidePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FnGuidePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FnGuidePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
