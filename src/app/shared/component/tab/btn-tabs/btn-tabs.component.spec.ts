import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTabsComponent } from './btn-tabs.component';

describe('BtnTabsComponent', () => {
  let component: BtnTabsComponent;
  let fixture: ComponentFixture<BtnTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
