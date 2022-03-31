import { TestBed } from '@angular/core/testing';

import { F1003Service } from './f1003.service';

describe('F1003Service', () => {
  let service: F1003Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1003Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
