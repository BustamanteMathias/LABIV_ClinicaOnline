import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTurnosProfesionalComponent } from './mis-turnos-profesional.component';

describe('MisTurnosProfesionalComponent', () => {
  let component: MisTurnosProfesionalComponent;
  let fixture: ComponentFixture<MisTurnosProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisTurnosProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTurnosProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
