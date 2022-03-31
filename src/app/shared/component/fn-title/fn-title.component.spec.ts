import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FnTitleComponent } from './fn-title.component';

describe('FnTitleComponent', () => {
  let component: FnTitleComponent;
  let fixture: ComponentFixture<FnTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FnTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FnTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
