import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectfontComponent } from './selectfont.component';

describe('SelectfontComponent', () => {
  let component: SelectfontComponent;
  let fixture: ComponentFixture<SelectfontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectfontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectfontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
