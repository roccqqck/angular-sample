import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCSVComponent } from './download-csv.component';

describe('DownloadCSVComponent', () => {
  let component: DownloadCSVComponent;
  let fixture: ComponentFixture<DownloadCSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCSVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
