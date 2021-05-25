import { TestBed } from '@angular/core/testing';

import { ValidarPacienteGuard } from './validar-paciente.guard';

describe('ValidarPacienteGuard', () => {
  let guard: ValidarPacienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidarPacienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
