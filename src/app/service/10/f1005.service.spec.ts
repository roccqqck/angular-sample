import { TestBed } from '@angular/core/testing';

import { F1005Service } from './f1005.service';

describe('F1005Service', () => {
  let service: F1005Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1005Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
