import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { disableBackGuard } from './disable-back.guard';

describe('disableBackGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => disableBackGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
