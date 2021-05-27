import { TestBed } from '@angular/core/testing';

import { ValidarAdministradorGuard } from './validar-administrador.guard';

describe('ValidarAdministradorGuard', () => {
  let guard: ValidarAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidarAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
