import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnErrorPageComponent } from './fn-error-page.component';

describe('FnErrorPageComponent', () => {
  let component: FnErrorPageComponent;
  let fixture: ComponentFixture<FnErrorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FnErrorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FnErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
