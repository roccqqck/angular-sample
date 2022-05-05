import { TestBed } from '@angular/core/testing';

import { F1021Service } from './f1021.service';

describe('F1021Service', () => {
  let service: F1021Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F1021Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
