import { TestBed } from '@angular/core/testing';

import { ValidarProfesionalGuard } from './validar-profesional.guard';

describe('ValidarProfesionalGuard', () => {
  let guard: ValidarProfesionalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidarProfesionalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
