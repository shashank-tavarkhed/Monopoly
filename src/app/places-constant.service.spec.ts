import { TestBed } from '@angular/core/testing';

import { PlacesConstantService } from './places-constant.service';

describe('PlacesConstantService', () => {
  let service: PlacesConstantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacesConstantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
