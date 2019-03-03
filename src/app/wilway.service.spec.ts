import { TestBed } from '@angular/core/testing';

import { WilwayService } from './wilway.service';

describe('WilwayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WilwayService = TestBed.get(WilwayService);
    expect(service).toBeTruthy();
  });
});
