import { TestBed } from '@angular/core/testing';

import { ConfirmEmailGuardGuard } from './confirm-email-guard.guard';

describe('ConfirmEmailGuardGuard', () => {
  let guard: ConfirmEmailGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConfirmEmailGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
