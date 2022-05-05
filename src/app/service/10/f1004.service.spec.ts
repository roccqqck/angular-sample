import { TestBed } from '@angular/core/testing';

import { F1004Service } from './f1004.service';

describe('F1004Service', () => {
  let service: F1004Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1004Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
