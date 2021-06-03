import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHistoriaClinicaComponent } from './ver-historia-clinica.component';

describe('VerHistoriaClinicaComponent', () => {
  let component: VerHistoriaClinicaComponent;
  let fixture: ComponentFixture<VerHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
