import { TestBed } from '@angular/core/testing';

import { F1002Service } from './f1002.service';

describe('F1002Service', () => {
  let service: F1002Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1002Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
