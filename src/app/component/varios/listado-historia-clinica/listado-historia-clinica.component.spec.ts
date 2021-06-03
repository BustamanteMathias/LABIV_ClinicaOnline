import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHistoriaClinicaComponent } from './listado-historia-clinica.component';

describe('ListadoHistoriaClinicaComponent', () => {
  let component: ListadoHistoriaClinicaComponent;
  let fixture: ComponentFixture<ListadoHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
