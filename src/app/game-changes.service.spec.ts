import { TestBed } from '@angular/core/testing';

import { GameChangesService } from './game-changes.service';

describe('GameChangesService', () => {
  let service: GameChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
