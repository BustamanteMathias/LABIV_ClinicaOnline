import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosFinalizadosPorMedicoComponent } from './turnos-finalizados-por-medico.component';

describe('TurnosFinalizadosPorMedicoComponent', () => {
  let component: TurnosFinalizadosPorMedicoComponent;
  let fixture: ComponentFixture<TurnosFinalizadosPorMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosFinalizadosPorMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosFinalizadosPorMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
