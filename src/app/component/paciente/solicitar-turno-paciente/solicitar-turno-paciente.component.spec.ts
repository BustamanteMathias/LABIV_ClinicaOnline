import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarTurnoPacienteComponent } from './solicitar-turno-paciente.component';

describe('SolicitarTurnoPacienteComponent', () => {
  let component: SolicitarTurnoPacienteComponent;
  let fixture: ComponentFixture<SolicitarTurnoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarTurnoPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarTurnoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
