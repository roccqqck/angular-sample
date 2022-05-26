import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FXMLComponent } from './fxml.component';

describe('FXMLComponent', () => {
  let component: FXMLComponent;
  let fixture: ComponentFixture<FXMLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FXMLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FXMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
