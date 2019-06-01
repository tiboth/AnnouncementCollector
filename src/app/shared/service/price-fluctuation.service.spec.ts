import { TestBed } from '@angular/core/testing';

import { PriceFluctuationService } from './price-fluctuation.service';

describe('PriceFluctuationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceFluctuationService = TestBed.get(PriceFluctuationService);
    expect(service).toBeTruthy();
  });
});
