import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarInformacionDeTurnoComponent } from './mostrar-informacion-de-turno.component';

describe('MostrarInformacionDeTurnoComponent', () => {
  let component: MostrarInformacionDeTurnoComponent;
  let fixture: ComponentFixture<MostrarInformacionDeTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarInformacionDeTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarInformacionDeTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
