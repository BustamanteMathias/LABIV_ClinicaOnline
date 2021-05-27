import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarConMensajeDiagnosticoComponent } from './confirmar-con-mensaje-diagnostico.component';

describe('ConfirmarConMensajeDiagnosticoComponent', () => {
  let component: ConfirmarConMensajeDiagnosticoComponent;
  let fixture: ComponentFixture<ConfirmarConMensajeDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarConMensajeDiagnosticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarConMensajeDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
