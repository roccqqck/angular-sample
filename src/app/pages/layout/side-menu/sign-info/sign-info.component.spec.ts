import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInfoComponent } from './sign-info.component';

describe('SignInfoComponent', () => {
  let component: SignInfoComponent;
  let fixture: ComponentFixture<SignInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
