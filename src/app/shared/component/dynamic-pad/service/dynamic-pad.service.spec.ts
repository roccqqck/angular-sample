import { TestBed } from '@angular/core/testing';

import { DynamicPadService } from './dynamic-pad.service';

describe('DynamicPadService', () => {
  let service: DynamicPadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicPadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
