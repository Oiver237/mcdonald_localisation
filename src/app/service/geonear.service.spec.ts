import { TestBed } from '@angular/core/testing';

import { GeonearService } from './geonear.service';

describe('GeonearService', () => {
  let service: GeonearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeonearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
